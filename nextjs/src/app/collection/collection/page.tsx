import { Collection } from './Collection';

export default function CategoryPage({
  params,
}: {
  params: { collection: string };
}) {
  return <Collection collection={params.collection} />;
}
