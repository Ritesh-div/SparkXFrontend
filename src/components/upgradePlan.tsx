import RupeeUpgrade from "./rupeeUpgrade";

export default function UpgradePlan() {
  return (
    <div className="overflow-y-auto h-[88vh] bg-amber-20 p-4 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-center text-3xl p-2 ">Upgrade Your Plan</h1>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-8 gap-2">

        <div className="w-full lg:w-[30%] h-auto bg-gray-50 p-6 rounded-lg shadow-md mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Free</h2>
          <RupeeUpgrade price={0} />
          <p className="mb-4">
            Explore how AI can help you with everyday tasks and everyday.
          </p>
          <div className="flex items-center justify-center mb-4">
            <button className="bg-gray-300 rounded-4xl text-white px-4 py-2 w-[90%] hover:disabled">
            Your Current Plan
            </button>
          </div>
          
          <ul className="list-disc pl-5 mb-4">
            <li>Access to basic features</li>
            <li>Limited support</li>
            <li>Community access</li>
            <li>Basic analytics</li>
            <li>Limited storage</li>
            <li>Basic security features</li>
            <li>Limited integrations</li>
          </ul>
        </div>

        <div className="w-full lg:w-[30%] h-auto bg-green-50 border-1 border-green-800 p-6 rounded-lg shadow-md mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Plus</h2>
          <RupeeUpgrade price={499} />
          <p className="mb-4">
            Upgrade to Plus for enhanced features and priority support.
          </p>
          <div className="flex items-center justify-center mb-4">
            <button className="bg-green-700 hover:bg-green-800 rounded-4xl text-white px-4 py-2 w-[90%] hover:disabled">
            Coming Soon
            </button>
          </div>
          
          <ul className="list-disc pl-5 mb-4">
            <li>All Free features</li>
            <li>Priority support</li>
            <li>Advanced analytics</li>
            <li>Increased storage</li>
            <li>Enhanced security features</li>
            <li>More integrations</li>
            <li>Customizable dashboard</li>
            <li>Access to beta features</li>
            <li>Monthly webinars</li>
            <li>Exclusive community access</li>
          </ul>
        </div>

        <div className="w-full lg:w-[30%] h-auto bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <RupeeUpgrade price={999} />
          <p className="mb-4">
            Upgrade to Pro for the ultimate AI experience with all features.
          </p>
          <div className="flex items-center justify-center mb-4">
            <button className="bg-gray-900 hover:bg-gray-950 rounded-4xl text-white px-4 py-2 w-[90%]">
              Coming Soon
            </button>
          </div>

          <ul className="list-disc pl-5 mb-4">
            <li>All Plus features included</li>
            <li>Advanced security features</li>
            <li>Unlimited storage</li>
            <li>Access to exclusive events</li>
            <li>Early access to new features</li>
            <li>24/7 support</li>
            <li>Priority feature requests</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
