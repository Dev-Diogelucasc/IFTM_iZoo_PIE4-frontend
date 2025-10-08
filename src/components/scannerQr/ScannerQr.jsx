import {useState} from 'react';
import {BarcodeScanner} from '@thewirv/react-barcode-scanner';

function ScannerQr() {
  const [data, setData] = useState('No result');

  return (
    <section className='bg-[#F8F8F8] flex flex-col rounded items-center'>
      <BarcodeScanner
        onSuccess={(text) => setData(text)}
        onError={(error) => {
          if (error) {
            console.error(error.message);
          }
        }}
        onLoad={() => console.log('Video feed has loaded!')}
        containerStyle={{width: '50vh', padding:"10px"}}
      />
      <p className='text-center'>{data}</p>
    </section>
  );
}

export default ScannerQr