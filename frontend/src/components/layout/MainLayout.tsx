import Header from './Header';
type PropsWithChildren = {
  children: React.ReactNode;
};

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 animate-gradient-xy">
      <div className="bg-gray-800/90 border border-gray-700 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg backdrop-blur-md">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
