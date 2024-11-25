import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectLabelWebinarProps = {
  webinarValue: string;
  handleWebinar: (value: string) => void;
};

export function SelectLabelWebinar({
  webinarValue,
  handleWebinar,
}: SelectLabelWebinarProps) {
  return (
    <Select
      value={webinarValue}
      onValueChange={(value) => handleWebinar(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select One" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectLabel> Webinar Integration</SelectLabel>
          <SelectItem value="GotoWebinar">GotoWebinar</SelectItem>
          <SelectItem value="Meetvio">Meetvio</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export type SelectLabelAutoresponderProps = {
  autoresponderValue: string;
  handleAutoresponder: (value: string) => void;
};

export function SelectLabelAutoresponder({
  autoresponderValue,
  handleAutoresponder,
}: SelectLabelAutoresponderProps) {
  return (
    <Select
      value={autoresponderValue}
      onValueChange={(value) => handleAutoresponder(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select One" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectLabel> HTML Copy/Paste</SelectLabel>
          <SelectItem value="Comm100">Comm100</SelectItem>
          <SelectItem value="LetsMail">LetsMail</SelectItem>
          <SelectItem value="InfusionSoft">InfusionSoft</SelectItem>
          <SelectItem value="One Shopping Cart">One Shopping Cart</SelectItem>
          <SelectItem value="Pure Leverage">Pure Leverage</SelectItem>
          <SelectItem value="LeadsFlow Pro">LeadsFlow Pro</SelectItem>
          <SelectItem value="Others">Others</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel> API Integration</SelectLabel>
          <SelectItem value="Aweber">Aweber</SelectItem>
          <SelectItem value="GetResponse">GetResponse</SelectItem>
          <SelectItem value="Mailchimp">Mailchimp</SelectItem>
          <SelectItem value="Sendreach">Sendreach</SelectItem>
          <SelectItem value="Sendlane">Sendlane</SelectItem>
          <SelectItem value="Activecampaign">Activecampaign</SelectItem>
          <SelectItem value="Mailvio">Mailvio</SelectItem>
          <SelectItem value="Sendinblue">Sendinblue</SelectItem>
          <SelectItem value="Sendiio">Sendiio</SelectItem>
          <SelectItem value="Mailerlite">Mailerlite</SelectItem>
          <SelectItem value="SendGrid">SendGrid</SelectItem>
          <SelectItem value="Global Control Center">
            Global Control Center
          </SelectItem>
          <SelectItem value="Icontact">Icontact</SelectItem>
          <SelectItem value="Constant Contact">Constant Contact</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export type SelectLabelFirstNameProps = {
  firstNameValue: string;
  handleFirstName: (value: string) => void;
};

export function SelectLabelFirstName({
  firstNameValue,
  handleFirstName,
}: SelectLabelFirstNameProps) {
  return (
    <Select
      value={firstNameValue}
      onValueChange={(value) => handleFirstName(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="first_name" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectItem value="first_name">first_name</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export type SelectLabelEmailProps = {
  emailValue: string;
  handleEmailValue: (value: string) => void;
};

export function SelectLabelEmail({
  emailValue,
  handleEmailValue,
}: SelectLabelEmailProps) {
  return (
    <Select
      value={emailValue}
      onValueChange={(value) => handleEmailValue(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="email" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectItem value="email">email</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export type SelectLabelPhoneProps = {
  phoneValue: string;
  handlePhoneValue: (value: string) => void;
};

export function SelectLabelPhone({
  phoneValue,
  handlePhoneValue,
}: SelectLabelPhoneProps) {
  return (
    <Select
      value={phoneValue}
      onValueChange={(value) => handlePhoneValue(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="-Select One-" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectItem value="-Select One-">-Select One-</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export type CheckboxSupprtHTTPSProps = {
  supportHTTPSValue: boolean;
  handleSupportHTTPSValue: () => void;
};

export function CheckboxSupprtHTTPS({
  supportHTTPSValue,
  handleSupportHTTPSValue,
}: CheckboxSupprtHTTPSProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={supportHTTPSValue}
        onCheckedChange={handleSupportHTTPSValue}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Check this box, in case your form does not support HTTPS (i.e, SSL)
      </label>
    </div>
  );
}
