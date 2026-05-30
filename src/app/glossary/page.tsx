import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TERMS = [
  { term: "WHV", full: "Working Holiday Visa", desc: "打工度假签证。允许年轻人在国外短期工作和旅行。澳洲462、新西兰WHV是最常见的选择。" },
  { term: "PTE", full: "Pearson Test of English", desc: "培生英语考试。与雅思同等认可，费用略低（约1950元），出分更快（2-5天），全机考。" },
  { term: "EOI", full: "Expression of Interest", desc: "意向书。部分签证（如澳洲WHV）需要先提交EOI，系统随机抽中后才能正式申请。" },
  { term: "Ausbildung", full: "Duale Ausbildung", desc: "德国双元制职业培训。学员在企业实践 + 职业学校学习，企业按月支付培训津贴。" },
  { term: "Sperrkonto", full: "Blocked Account", desc: "德国保证账户。留学生需存入约11208欧元，每月最多支取934欧元作为生活费证明。" },
  { term: "APS", full: "Akademische Prüfstelle", desc: "德国驻华使馆留德人员审核部。中国学生申请德国高校前的学历审核程序。" },
  { term: "TFN", full: "Tax File Number", desc: "澳大利亚税号。到达澳洲后第一件事就是申请TFN，工作必需。" },
  { term: "OVHC", full: "Overseas Visitor Health Cover", desc: "海外游客健康保险。澳洲WHV和工作签证持有者需购买。" },
  { term: "WWOOF", full: "World Wide Opportunities on Organic Farms", desc: "全球有机农场打工换宿。每天工作4-6小时换取免费食宿，不需要工作签证。" },
  { term: "Au Pair", full: "互惠生", desc: "住在当地家庭帮忙照顾孩子或做简单家务，换取免费食宿 + 零花钱 + 语言学习机会。" },
  { term: "Superannuation", full: "养老金（澳洲）", desc: "澳洲雇主强制为员工缴纳的养老金，约工资的11%。离境时可申请退还。" },
  { term: "二签", full: "第二次打工度假签证", desc: "澳洲462签证持有者在偏远地区从事指定工作满88天后，可申请第二个12个月的签证。" },
  { term: "三签", full: "第三次打工度假签证", desc: "持二签期间继续在偏远地区工作满6个月，可申请第三个12个月的签证。" },
  { term: "ImmiAccount", full: "澳洲移民局在线账户", desc: "在澳洲移民局官网注册的个人账户，用于在线提交签证申请和查看审理进度。" },
];

export default function GlossaryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-earth-900 font-[family-name:var(--font-display)]">
            术语表
          </h1>
          <p className="text-earth-500 mt-2 text-sm">
            出国信息中常见的术语和缩写，帮你快速看懂政策和材料要求
          </p>
        </div>

        <div className="space-y-4">
          {TERMS.map((t) => (
            <div key={t.term} className="glass rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="px-2.5 py-1 rounded-md bg-moss-100 text-moss-700 text-sm font-bold flex-shrink-0">
                  {t.term}
                </span>
                <div>
                  <p className="text-xs text-earth-400">{t.full}</p>
                  <p className="text-sm text-earth-700 mt-1 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
