// Helper function to find the download PDF for a product
export function getDownloadPath(productTitle: string, category: string): string {
  // Mapping of product titles to their PDF paths
  const downloadMap: Record<string, string> = {
    // COURSES
    "Master 3D Printing": "/WEBSITE SOURCE/COURSES/COURSES/3D PRINTING/LINK/3DPrintingMasterclass.pdf",
    "Canva Masterclass": "/WEBSITE SOURCE/COURSES/COURSES/CANVA COURSES/DOWNLOAD LINK/CanvaMasterclassCourse.pdf",
    "ChatGPT Masterclass": "/WEBSITE SOURCE/COURSES/COURSES/CHATGPT/DOWNLOAD LINK/chatGPTMasterclass.pdf",
    "Communication Skills": "/WEBSITE SOURCE/COURSES/COURSES/COMMUNICATION/DOWNLOAD LINK/CompleteCommunicationSkillsMasterclassforLife.pdf",
    "Digital Marketing": "/WEBSITE SOURCE/COURSES/COURSES/DIGITAL MARKETING/DOWNLOAD LINK/TheCompleteDigitalMarketingCourse.pdf",
    "Drawing Course": "/WEBSITE SOURCE/COURSES/COURSES/DRAWING COURSES/DOWNLOAD LINK/TheUltimateDrawingCourse.pdf",
    "Forex Trading": "/WEBSITE SOURCE/COURSES/COURSES/FOREX TRADING/DOWNLOAD LINK/FOREXTradingCourse.pdf",
    "Graphic Design": "/WEBSITE SOURCE/COURSES/COURSES/GRAPHIC DESIGN/DOWNLOAD LINK/GraphicDesignMasterclass.pdf",
    "Microsoft Office": "/WEBSITE SOURCE/COURSES/COURSES/MICROSOFT OFFICE/DOWNLOAD LINK/UltimateMicrosoftOfficeExcelWordPowerPointAccess.pdf",
    "Personal Finance": "/WEBSITE SOURCE/COURSES/COURSES/PERSONAL FINANCE/PersonalFinanceMasterclass.pdf",
    "WordPress": "/WEBSITE SOURCE/COURSES/COURSES/WORDPRESS/DOWNLOAD LINK/WordPressforBeginners.pdf",
    
    // LEARN LANGUAGE
    "Learn Chinese": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN CHINISE/DOWNLOAD LINK/LearnChinese.pdf",
    "English Speaking": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN ENGLISH/DOWNLOAD LINK/MasterEnglishLanguageSpeakingCourse.pdf",
    "Learn French": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN FRENCH/DOWNLOAD LINK/LearnFrench.pdf",
    "Learn Hindi": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN HINDI/DOWNLOAD LINK/LearnHindi.pdf",
    "Learn Italian": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN ITALIAN/DOWNLOAD LINK/LearnItalian.pdf",
    "Learn Polish": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN POLISH/DOWNLOAD LINK/LearnPolish.pdf",
    "Learn Portuguese": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN PORTUGUESE/DOWNLOAD LINK/LearnPortuguese.pdf",
    "Learn Russian": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN RUSSIAN/DOWNLOAD LINK/LearnRussian.pdf",
    "Learn Spanish": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN SPANISH/DOWNLOAD LINK/LearnSpanish.pdf",
    
    // RESELL BUNDLE
    "1,000,000+ T-Shirt": "/WEBSITE SOURCE/RESELL BUNDLE/1 MILLION T-SHIRT DESIGN/DOWNLOAD LINK/1MillionShirtDesignsUpdated.pdf",
    "100,000+ Printable Wall Art": "/WEBSITE SOURCE/RESELL BUNDLE/100000 Artwall/DOWNLOAD LINK/DOWNLOAD_LINKS 100k poster mall.pdf",
    "200K LASER": "/WEBSITE SOURCE/RESELL BUNDLE/200K LASER CUTTING FILES/DOWNLOAD LINK/DOWNLOAD LINK.pdf",
    "300,000+ eBook": "/WEBSITE SOURCE/RESELL BUNDLE/300,000 EBOOK/DOWNLOAD FILE/300000 EBOOK PDF .pdf",
    "5000+ UDEMY": "/WEBSITE SOURCE/RESELL BUNDLE/5000+ UDEMY COURSES/DOWNLOAD LINK/UdemyCourseBundle.pdf",
    "80,000 Mega Bundle Tumbler": "/WEBSITE SOURCE/RESELL BUNDLE/80,000 Tumbler Bundle/DOWNLOAD LINK/TumblersBundle.pdf",
    
    // T-SHIRT DESIGN
    "1000+ Design Bundle": "/WEBSITE SOURCE/T-SHIRT DESIGN/1000+ Design Bundle High Resolution Tshirt Designs/Urban2023Banner.pdf",
    "10K+ Anime": "/WEBSITE SOURCE/T-SHIRT DESIGN/10K+ Anime design png/DOWNLOAD LINK/Anime-Design-Bundle-x6mq9z.pdf",
    "1300 T-Shirt Unique Car": "/WEBSITE SOURCE/T-SHIRT DESIGN/1300 T-Shirt Unique Car Bundle PNG Files/DOWNLOAD LINK/UNIQUECARS.pdf",
    "70+ pop culture": "/WEBSITE SOURCE/T-SHIRT DESIGN/70+ pop culture T-Shirt Designs - PNG/DOWNLOAD LINK/popculturebundlelink.pdf",
  }
  
  // Find matching download path
  for (const [key, path] of Object.entries(downloadMap)) {
    if (productTitle.includes(key)) {
      return path
    }
  }
  
  // Default fallback
  return ""
}

// Function to trigger file download
export function downloadFile(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function to download multiple files with delay
export async function downloadMultipleFiles(files: { url: string; filename: string }[]) {
  for (let i = 0; i < files.length; i++) {
    // Add delay between downloads to avoid browser blocking
    if (i > 0) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    downloadFile(files[i].url, files[i].filename)
  }
}



