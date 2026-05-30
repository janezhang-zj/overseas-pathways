export default function Footer() {
  return (
    <footer className="mt-auto border-t border-earth-200/50 bg-earth-50">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-earth-600 text-sm leading-relaxed">
              这里没有"逆袭"，只有每个人本来就可以有的选择。
            </p>
            <p className="text-earth-400 text-xs mt-1">
              所有数据来自各国移民局官网，定期人工核对更新。
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://immi.homeaffairs.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-earth-400 hover:text-earth-600 text-xs transition-colors"
            >
              澳洲移民局
            </a>
            <a
              href="https://www.make-it-in-germany.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-earth-400 hover:text-earth-600 text-xs transition-colors"
            >
              德国官方
            </a>
            <span className="text-earth-300 text-xs">
              © {new Date().getFullYear()} 飘向远方
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
