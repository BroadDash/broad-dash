export default function DeepLinkPage({
  params,
}: {
  params: { clientId: string };
}) {
  return <div>Current pathname: {params.clientId}</div>;
}
