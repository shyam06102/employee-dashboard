export default function SummaryCard({ employees = [] }) {
  const total = employees.length;
  const active = employees.filter(e => e.status).length;

  return (
    <div className="summary-cards">
      <div className="card total">
        <div className="label">Total Employees</div>
        <div className="value">{total}</div>
      </div>
      <div className="card active">
        <div className="label">Active</div>
        <div className="value">{active}</div>
      </div>
      <div className="card inactive">
        <div className="label">Inactive</div>
        <div className="value">{total - active}</div>
      </div>
    </div>
  );
}