type Params = {
  params: {
    notFound: string[];
  };
};

const Page404 = ({ params }: Params) => {
  return <div>Page introuvable {params.notFound.join("/")}</div>;
};

export default Page404;
