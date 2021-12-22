export const handleGenericError = (e: any, toast: (input: any) => any) => {
  console.log(e);
  let message: string;

  if (e instanceof Error) {
    message = e.toString();
  } else {
    message = e.message ?? JSON.stringify(e);
  }

  toast({
    title: "Error!",
    description: message,
    status: "error",
    duration: 9000,
    isClosable: true,
    position: "bottom",
  });
};
