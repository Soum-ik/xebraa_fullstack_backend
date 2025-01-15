import Image from 'next/image';
import meter from '@/../public/images/access_point/Meter.svg'
import fule from '@/../public/images/access_point/Fule.svg'
import life from '@/../public/images/access_point/Life.svg'
import location from '@/../public/images/access_point/Location.svg'
import tire from '@/../public/images/access_point/Tire.svg'
import lock from '@/../public/images/access_point/lock.svg'
import Status from '@/../public/images/Charging status.svg'
import EV_battery from '@/../public/images/Battery.svg'
import EV_Capacity from '@/../public/images/Battery Capacity.svg'
import EV_Limit from '@/../public/images/VIN/bttery limit manage.svg'
import Ammeter from '@/../public/images/VIN/Charging Ampere.svg'
import Voltmeter from '@/../public/images/VIN/Charging voltage.svg'
import Wattmeter from '@/../public/images/VIN/Charging Watt.svg'
import completion from '@/../public/images/VIN/Completetion Time.svg'
import schedule from '@/../public/images/VIN/Schedule Charging.svg'
import Speedmeter from '@/../public/images/VIN/Speedo meter.svg';
import virtual_key from '@/../public/images/VIN/Virtua key.svg'
import userAccess from '@/../public/images/VIN/Icons.svg'
import Nominal from '@/../public/images/VIN/capacity.svg'

// Define all possible permissions
const permissions = [
    { key: '/location', icon: location, label: 'Location' },
    { key: '/odometer', icon: meter, label: 'Odometer' },
    { key: '/security', icon: lock, label: 'Lock & unlock' },
    { key: '/tires/pressure', icon: tire, label: 'Tire pressure' },
    { key: '/battery', icon: EV_battery, label: 'Battery' },
    { key: '/battery/capacity', icon: EV_Capacity, label: 'Battery Capacity' },
    { key: '/battery/nominal_capacity', icon: Nominal, label: 'Battery Nominal Capacity' },
    { key: '/charge', icon: Status, label: 'Charging Status' },
    { key: '/charge/limit', icon: EV_Limit, label: 'Charge Limit' },
    { key: '/fuel', icon: fule, label: 'Fuel tank level' },
    { key: '/engine/oil', icon: life, label: 'Engine oil life' },
    { key: "/virtual_key", icon: virtual_key, label: "Virtual key" },
    { key: "/user/access", icon: userAccess, label: "User Access" },
    { key: '/charge/voltmeter', icon: Voltmeter, label: 'Charge Voltmeter' },
    { key: "/charge/ammeter", icon: Ammeter, label: "Charging Ammeter" },
    { key: "/charge/wattmeter", icon: Wattmeter, label: "Charging Wattmeter" },
    { key: "/charge/schedule", icon: schedule, label: "Schedule Charging" },
    { key: '/charge/completion', icon: completion, label: 'Charge Completion' },
    { key: "/speedometer", icon: Speedmeter, label: "Speedometer" },
    // { key: "/speedometer", icon: ChargeLimit, label: "Speedometer" },
    // { key: "/speedometer", icon: ChargeLimit, label: "Speedometer" },
    // { "endpoint": "/tesla/charge/limit", "permission": "read_charge" },

];



export default function Access({ endpoints }: { endpoints: { endpoint: string, capable: boolean }[] }) {

    // Filter permissions based on the provided endpoints and ensure they are capable
    const allowedPermissions = permissions.filter(permission =>
        endpoints.some(endpoint => endpoint.endpoint.includes(permission.key) && endpoint.capable)
    );

    return (
        <div className="w-full">
            <h3 className="mt-[20px] w-full font-inter font-bold text-[12px] text-ti_grey">
                Access permissions
            </h3>
            <div className="grid grid-cols-2 mt-[10px] gap-[10px]">
                {allowedPermissions.map((permission, index) => (
                    <div
                        key={index}
                        className="flex gap-[10px] px-[10px] py-[8px] border border-bg_powerd_blue"
                    >
                        <Image
                            className="size-[18px]"
                            src={permission.icon}
                            alt={permission.label}
                        />
                        <span className="text-[12px] font-inter text-ti_light_black font-medium">
                            {permission?.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
