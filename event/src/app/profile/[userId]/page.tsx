export default function UserProfile({
  params,
}: {
  params: { userId: string };
}) {
  return <p>Profile for user {params.userId}</p>;
}
