import Image from "next/image";
import Link from "next/link";

type ButtonProps = {
  label: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  label,
  href,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const className =
    "group flex h-12 w-fit items-center justify-center gap-2 transition-colors button-primary";

  const content = (
    <>
      <span>{label}</span>

      <Image
        className="ml-2 h-[20px] w-[20px] transition-all duration-300 group-hover:ml-3"
        src="/arrow-button.svg"
        alt=""
        width={20}
        height={20}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {content}
    </button>
  );
}