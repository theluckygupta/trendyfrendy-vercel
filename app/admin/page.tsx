export default function AdminDashboard() {

  return (
    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, Lucky 👋
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        {[
          {
            title: "Products",
            value: "0",
          },

          {
            title: "Orders",
            value: "0",
          },

          {
            title: "Customers",
            value: "0",
          },

          {
            title: "Revenue",
            value: "₹0",
          },
        ].map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >

            <p className="text-gray-500 mb-2">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold">
              {item.value}
            </h2>

          </div>

        ))}

      </div>

    </div>
  );
}