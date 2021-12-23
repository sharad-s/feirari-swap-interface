import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import { ReactNode } from "react";

const AppLink: any = ({
  children,
  href,
  as,
  isExternal = false,
  ...linkProps
}: {
  children: ReactNode[];
  href: string;
  as: any;
  isExternal: boolean;
  linkProps: any;
}) => {
  return (
    <NextLink href={href} passHref>
      <Link as={as} {...linkProps} isExternal={isExternal}>
        {children}
      </Link>
    </NextLink>
  );
};

export default AppLink;
