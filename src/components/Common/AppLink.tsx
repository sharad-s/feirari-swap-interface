import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import { ReactNode } from "react";

const AppLink: any = ({
  children,
  href,
  as,
  ...linkProps
}: {
  children: ReactNode[];
  href: string;
  as: any;
  linkProps: any;
}) => {
  return (
    <NextLink href={href} passHref >
      <Link as={as} {...linkProps}>
        {children}
      </Link>
    </NextLink>
  );
};

export default AppLink;
