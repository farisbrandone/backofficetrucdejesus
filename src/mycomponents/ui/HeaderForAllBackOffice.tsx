function HeaderForAllBackOffice() {
  return (
    <div className="headerAcceuil w-full h-[40px] flex p-0 pr-8 pt-2 justify-end">
      <div className="avatarAcceuil p-0 w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center">
        <img
          src="./isabelle.jpg"
          alt=""
          width={40}
          height={40}
          className=" w-[40px] h-[40px] object-cover rounded-full p-0"
        />
      </div>
    </div>
  );
}

export default HeaderForAllBackOffice;
