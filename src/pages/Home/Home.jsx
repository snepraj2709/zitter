import { Sidebar } from '../../components/sidebar/Sidebar';

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <aside className="flex-shrink-0">
          <Sidebar />
        </aside>
      </div>
      <div className="w-2/4">
        <div className="bg-gray-200">Feed</div>
      </div>
      <div className="w-1/4 hidden lg:block">
        <div className="bg-gray-300">Suggested User</div>
      </div>
    </div>
  );
}
