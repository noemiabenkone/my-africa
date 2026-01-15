
export default function Home() {
  return (
    <main
      className="
        flex flex-col items-center justify-center
        min-h-screen
        bg-[url('https://static.vecteezy.com/system/resources/previews/035/618/009/non_2x/ai-generated-a-vivid-vacation-background-bold-colors-cultural-elements-and-generous-copy-space-free-photo.jpg')]
        bg-cover bg-center
        text-white
      "
    >
      <header className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-2">
          welcome to my home
        </h1>
        <hr className="w-40 border-white" />
      </header>

      <section className="flex flex-col items-center">
        <p className="mb-4">
          ACCESS YOUR ACCOUNT
        </p>

        <button
          className="
            mt-2 px-6 py-4
            rounded-lg
            bg-red-900
            hover:bg-red-700
            transition
          "
        >
          REGISTER
        </button>
      </section>
    </main>
  );
}
