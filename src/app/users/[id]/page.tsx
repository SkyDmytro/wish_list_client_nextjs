const Page = ({ params }: { params: { id: string } }) => {
  return <div key="user-page">UserPage {params.id}</div>;
};

export default Page;
