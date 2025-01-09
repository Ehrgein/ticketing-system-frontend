import { useIsAuthenticated } from "../helpers/useGetUserData";
import { createClient } from "../utils/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import Users from "./Users";

export default async function getAuth() {
  const supabase = await createClient();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["auth"],
    queryFn: useIsAuthenticated,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Users />
    </HydrationBoundary>
  );
}
