export default function Table(props) {
  const { data, currentPage, historyPerPage } = props;

  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th>No.</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Nomor Telepon</th>
          <th>Paket Wisata</th>
          <th>Metode Pembayaran</th>
        </tr>
      </thead>
      <tbody>
        {data.map((transaction, index) => (
          <tr key={index}>
            <td>{index + 1 + historyPerPage * (currentPage - 1)}</td>
            <td>{transaction.nama}</td>
            <td>{transaction.email}</td>
            <td>{transaction.telepon}</td>
            <td>{transaction.paket}</td>
            <td>{transaction.pembayaran}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
