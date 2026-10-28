import Layout from "@/Layouts/Layout";
import { Main } from "@/Pages/Main";

export default function App() {
  return (
    <div
      className="bg-theme-bg text-theme-text h-full flex"
      data-theme="dark"
    >
      <Layout>
        <Main />
      </Layout>
    </div>
  );
}
