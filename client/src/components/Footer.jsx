export default function Footer() {
    return (
        <footer className="w-full p-5 mt-8 flex items-center justify-center flex-col gap-0.5">
            <span className="text-gray text-sm text-center">&copy; 2025 Equipada. Todos os direitos reservados.</span>
            <span className="text-gray text-sm text-center">Alguns dos dados nesta plataforma são fornecidos por <a href="https://www.igdb.com/" target="_blank" rel="noopener noreferrer" className="text-raspberry hover:underline">IGDB</a> e <a href="https://store.steampowered.com/" target="_blank" rel="noopener noreferrer" className="text-raspberry hover:underline">Steam</a>.</span>
        </footer>
    )
}