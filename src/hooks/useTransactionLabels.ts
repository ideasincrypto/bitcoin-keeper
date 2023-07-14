import { useContext } from 'react';
import { EntityKind } from 'src/core/wallets/enums';
import { RealmWrapperContext } from 'src/storage/realm/RealmProvider';
import { RealmSchema } from 'src/storage/realm/enum';

const useTransactionLabels = ({ txid, wallet }) => {
  const { useQuery } = useContext(RealmWrapperContext);
  const Tags = useQuery(RealmSchema.Tags);
  const isVault = wallet.entityKind === EntityKind.VAULT;
  const txLabels = Tags.filtered(`ref CONTAINS '${txid}' AND type != 'TXN'`);
  const labels = txLabels.map((tag) => ({ name: tag.label, isSystem: tag.isSystem }));
  if (!isVault) labels.push({ name: wallet.presentationData.name, isSystem: true });
  return { labels } as { labels: { name: string; isSystem: boolean }[] };
};

export default useTransactionLabels;