import MiModal from '@base/components/MiModal';

const MiddlePage = () => {
  return (
    <MiModal
      isOpen={true}
      title={''}
      size='xl'
      onClose={function (value: any): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default MiddlePage;