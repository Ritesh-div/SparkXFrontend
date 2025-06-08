import { IndianRupee } from 'lucide-react'
export default function RupeeUpgrade({ price = "0" }: { price?: number | string }) {
  return (
    <div>
      <div className="flex">
            <IndianRupee />
            <p className="text-5xl">{price}</p>
            <div className="flex-col text-xs mt-3 p-1">
                <p className="text-gray-300">Rupee/</p>
                <p className="text-gray-300">month</p>
            </div>
          </div>
    </div>
  )
}
