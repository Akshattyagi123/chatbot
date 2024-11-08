import { NavLink, BrowserRouter, Routes, Route } from 'react-router-dom';
import Coursesoffered from './Coursesoffered';
import { InternshipPage } from './InternshipPage';
import { PayAfterPlacement } from './PayAfterPlacement';



const Admin = () => {

    return (
        <BrowserRouter>
            <div className="min-h-screen flex">

                <aside className="w-64 bg-green-700 text-white flex-shrink-0 p-4">
                    <div className="text-2xl font-semibold mb-4">Admin Panel</div>
                    <nav className="flex flex-col space-y-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded hover:bg-slate-300 hover:text-green-700 ${isActive ? 'bg-slate-300 text-green-700' : ''}`
                            }
                        >
                            Courses

                        </NavLink>

                        <NavLink
                            to="/Internship"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded hover:bg-slate-300 hover:text-green-700 ${isActive ? 'bg-slate-300 text-green-700' : ''}`
                            }
                        >
                            Internship Training Program
                        </NavLink>

                        <NavLink
                            to="/PayAfterPlacement"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded hover:bg-slate-300 hover:text-green-700 ${isActive ? 'bg-slate-300 text-green-700' : ''}`
                            }
                        >
                            PayAfterPlacement
                        </NavLink>
                    </nav>
                </aside>


                <div className="flex-1 bg-gray-100">

                    <header className="bg-white shadow p-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold">Admin Panel</h1>
                        <div>
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Profile</button>
                        </div>
                    </header>

                    <main className="p-6">
                        <Routes>
                            <Route path="/" element={<Coursesoffered />} />
                            <Route path="/Internship" element={<InternshipPage />} />
                            <Route path="/PayAfterPlacement" element={<PayAfterPlacement />} />
                        </Routes>                                                                   
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Admin;
