import { useQuery } from "@tanstack/react-query";

function TestQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: async () => "React Query works",
  });

  if (isLoading) return <div>Loading...</div>;

  return <div>{data}</div>;
}

export default TestQuery;
