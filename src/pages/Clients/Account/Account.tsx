import Header from "../../../Layout/LayoutUser/Header"

const Account = () => {

    return (
        <div >
            <Header />
            <div className="overflow-x-auto">
                <table
                    className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
                >
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </th>
                            <th
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                            >
                                Date of Birth
                            </th>
                            <th
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                            >
                                Role
                            </th>
                            <th
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                            >
                                Salary
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="odd:bg-gray-50 dark:odd:bg-gray-800/50">
                            <td
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                            >
                                John Doe
                            </td>
                            <td
                                className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                            >
                                24/05/1995
                            </td>
                            <td
                                className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                            >
                                Web Developer
                            </td>
                            <td
                                className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                            >
                                $120,000
                            </td>
                        </tr>

                        <tr className="odd:bg-gray-50 dark:odd:bg-gray-800/50">
                            <td
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                            >
                                Jane Doe
                            </td>
                            <td
                                className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                            >
                                04/11/1980
                            </td>
                            <td
                                className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                            >
                                Web Designer
                            </td>
                            <td
                                className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                            >
                                $100,000
                            </td>
                        </tr>

                        <tr className="odd:bg-gray-50 dark:odd:bg-gray-800/50">
                            <td
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                            >
                                Gary Barlow
                            </td>
                            <td
                                className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                            >
                                24/05/1995
                            </td>
                            <td
                                className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                            >
                                Singer
                            </td>
                            <td
                                className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
                            >
                                $20,000
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Account