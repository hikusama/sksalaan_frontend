import { Link, Outlet } from "react-router-dom";

export default function Layout() {



    return <>
        <header>
            {/*  */}
        </header>

        <main>
            <div className="contents">
                <Outlet />
            </div>
        </main>


    </>
}