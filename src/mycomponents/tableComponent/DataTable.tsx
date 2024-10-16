import { seedData, User } from "@/fakeData";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import DebouncedInput from "./ui/DebouncedInput";
import { Search } from "lucide-react";

interface typeDataTable {
  myid: string;
  setMyid: React.Dispatch<React.SetStateAction<string>>;
  setTabPage: React.Dispatch<React.SetStateAction<string>>;
}

function DataTable({ myid, setMyid, setTabPage }: typeDataTable) {
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <span> {info.row.index + 1} </span>,
      header: "S.No",
    }),
    columnHelper.accessor("iconUrl", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="..."
          className="rounded-md w-10 h-10 object-cover"
        />
      ),
      header: "Icon",
    }),
    columnHelper.accessor("title", {
      cell: (info) => <span> {info.getValue()} </span>,
      header: "Titre",
    }),
    columnHelper.accessor("date", {
      cell: (info) => <span> {info.getValue()} </span>,
      header: "Dernière modification",
    }),
    /*  columnHelper.accessor("age", {
      cell: (info) => <span> {info.getValue()} </span>,
      header: "Age",
    }),
    columnHelper.accessor("visits", {
      cell: (info) => <span> {info.getValue()} </span>,
      header: "Visits",
    }),
    columnHelper.accessor("progress", {
      cell: (info) => <span> {info.getValue()} </span>,
      header: "Progress",
    }), */
  ];

  const [data, setData] = useState<User[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [errorData, setErrorData] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const functionSeed = async () => {
      try {
        const myData = await seedData();
        console.log(myData[0]);
        if (!myid) {
          setMyid(myData[0].id);
        }

        setData(() => [...myData]);
      } catch (error) {
        console.log(error);
        setErrorData(
          "Une erreur est survenue pendant la récupération des données"
        );
      }
    };

    functionSeed();
  }, []);
  if (errorData) {
    return (
      <div className="text-center pt-4">
        {errorData} vérifier votre connexion
      </div>
    );
  }
  if (!data.length && !errorData) {
    return (
      <div className="text-center pt-4">Données en cours de chargement...</div>
    );
  }
  if (table) {
    return (
      <div className="p-2 max-w-5xl text-gray-800">
        <div className="flex justify-between mb-2">
          <div className="w-full flex items-center gap-1">
            <Search className="text-gray-800" />
            <DebouncedInput
              debounce={500}
              value={globalFilter ?? ""}
              onChange={(value: any) => setGlobalFilter(String(value))}
              className="p-1 px-4 bg-transparent outline-none border-2 w-1/5 focus:w-1/3 duration-300 border-[#bd10e0] rounded-[80px]"
              placeholder="Search all columns..."
            />
          </div>
          {/* <DownloadBtn data={data} fileName={"peoples"} /> */}
        </div>

        <table className="border border-gray-200 w-full text-center rounded-lg shadow-2xl">
          <thead className="bg-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className=" capitalize px-3.5 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                 ${
                   i % 2 === 0 ? "bg-gray-400" : "bg-gray-200 "
                 } cursor-pointer ${
                    myid === row.getValue("id")
                      ? " border-[#bd10e0] border-[2px] "
                      : ""
                  }
              `}
                  onClick={() => {
                    console.log({ "row.get.value": row.getValue("id") });
                    setMyid(row.getValue("id"));
                    setTabPage("détails notifications");
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Recoard Found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* pagination */}
        <div className="flex items-center justify-end mt-2 gap-2  ">
          <button
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="p-1 border-gray-300 px-2 disabled:opacity-30"
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="p-1 border-gray-300 px-2 disabled:opacity-30"
          >
            {">"}
          </button>
          <span className="flex items-center gap-1 ">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              title="entrer la page"
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-transparent"
            />
          </span>

          <select
            title="selectionner la taille de pagination"
            name=""
            id=""
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="p-2 bg-transparent"
          >
            {[10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  return <div>{errorData} vérifier votre connexion</div>;
}

export default DataTable;
