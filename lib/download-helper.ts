// Helper function to find the download PDF for a product
export function getDownloadPath(productTitle: string, category: string): string {
  console.log("[DownloadHelper] Getting download path", { productTitle, category })
  
  // Normalize title for better matching
  const normalizedTitle = productTitle.toLowerCase().trim()
  
  // Mapping of product titles to their PDF paths
  const downloadMap: Record<string, string> = {
    // COURSES
    "master 3d printing": "/WEBSITE SOURCE/COURSES/COURSES/3D PRINTING/LINK/3DPrintingMasterclass.pdf",
    "canva masterclass": "/WEBSITE SOURCE/COURSES/COURSES/CANVA COURSES/DOWNLOAD LINK/CanvaMasterclassCourse.pdf",
    "chatgpt masterclass": "/WEBSITE SOURCE/COURSES/COURSES/CHATGPT/DOWNLOAD LINK/chatGPTMasterclass.pdf",
    "communication skills": "/WEBSITE SOURCE/COURSES/COURSES/COMMUNICATION/DOWNLOAD LINK/CompleteCommunicationSkillsMasterclassforLife.pdf",
    "digital marketing": "/WEBSITE SOURCE/COURSES/COURSES/DIGITAL MARKETING/DOWNLOAD LINK/TheCompleteDigitalMarketingCourse.pdf",
    "drawing course": "/WEBSITE SOURCE/COURSES/COURSES/DRAWING COURSES/DOWNLOAD LINK/TheUltimateDrawingCourse.pdf",
    "forex trading": "/WEBSITE SOURCE/COURSES/COURSES/FOREX TRADING/DOWNLOAD LINK/FOREXTradingCourse.pdf",
    "graphic design": "/WEBSITE SOURCE/COURSES/COURSES/GRAPHIC DESIGN/DOWNLOAD LINK/GraphicDesignMasterclass.pdf",
    "microsoft office": "/WEBSITE SOURCE/COURSES/COURSES/MICROSOFT OFFICE/DOWNLOAD LINK/UltimateMicrosoftOfficeExcelWordPowerPointAccess.pdf",
    "personal finance": "/WEBSITE SOURCE/COURSES/COURSES/PERSONAL FINANCE/PersonalFinanceMasterclass.pdf",
    "wordpress": "/WEBSITE SOURCE/COURSES/COURSES/WORDPRESS/DOWNLOAD LINK/WordPressforBeginners.pdf",
    
    // LEARN LANGUAGE
    "learn chinese": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN CHINISE/DOWNLOAD LINK/LearnChinese.pdf",
    "english speaking": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN ENGLISH/DOWNLOAD LINK/MasterEnglishLanguageSpeakingCourse.pdf",
    "learn french": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN FRENCH/DOWNLOAD LINK/LearnFrench.pdf",
    "learn hindi": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN HINDI/DOWNLOAD LINK/LearnHindi.pdf",
    "learn italian": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN ITALIAN/DOWNLOAD LINK/LearnItalian.pdf",
    "learn polish": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN POLISH/DOWNLOAD LINK/LearnPolish.pdf",
    "learn portuguese": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN PORTUGUESE/DOWNLOAD LINK/LearnPortuguese.pdf",
    "learn russian": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN RUSSIAN/DOWNLOAD LINK/LearnRussian.pdf",
    "learn spanish": "/WEBSITE SOURCE/COURSES/LEARN LANGUAGE/LEARN SPANISH/DOWNLOAD LINK/LearnSpanish.pdf",
    
    // RESELL BUNDLE
    "1,000,000+ t-shirt": "/WEBSITE SOURCE/RESELL BUNDLE/1 MILLION T-SHIRT DESIGN/DOWNLOAD LINK/1MillionShirtDesignsUpdated.pdf",
    "100,000+ printable wall art": "/WEBSITE SOURCE/RESELL BUNDLE/100000 Artwall/DOWNLOAD LINK/DOWNLOAD_LINKS 100k poster mall.pdf",
    "200k+ cnc files laser": "/WEBSITE SOURCE/RESELL BUNDLE/200K LASER CUTTING FILES/DOWNLOAD LINK/DOWNLOAD LINK.pdf",
    "200k laser": "/WEBSITE SOURCE/RESELL BUNDLE/200K LASER CUTTING FILES/DOWNLOAD LINK/DOWNLOAD LINK.pdf",
    "300,000+ ebook": "/WEBSITE SOURCE/RESELL BUNDLE/300,000 EBOOK/DOWNLOAD FILE/300000 EBOOK PDF .pdf",
    "5000+ udemy": "/WEBSITE SOURCE/RESELL BUNDLE/5000+ UDEMY COURSES/DOWNLOAD LINK/UdemyCourseBundle.pdf",
    "80,000 mega bundle tumbler": "/WEBSITE SOURCE/RESELL BUNDLE/80,000 Tumbler Bundle/DOWNLOAD LINK/TumblersBundle.pdf",
    
    // T-SHIRT DESIGN - Add more comprehensive matching
    "1000+ design bundle": "/WEBSITE SOURCE/T-SHIRT DESIGN/1000+ Design Bundle High Resolution Tshirt Designs/Urban2023Banner.pdf",
    "10k+ anime": "/WEBSITE SOURCE/T-SHIRT DESIGN/10K+ Anime design png/DOWNLOAD LINK/Anime-Design-Bundle-x6mq9z.pdf",
    "1300 t-shirt unique car": "/WEBSITE SOURCE/T-SHIRT DESIGN/1300 T-Shirt Unique Car Bundle PNG Files/DOWNLOAD LINK/UNIQUECARS.pdf",
    "70+ pop culture": "/WEBSITE SOURCE/T-SHIRT DESIGN/70+ pop culture T-Shirt Designs - PNG/DOWNLOAD LINK/popculturebundlelink.pdf",
    "set of 300 summer bundle": "/WEBSITE SOURCE/T-SHIRT DESIGN/Set of 300 Summer Bundle SVG/DOWNLOAD LINK/SummerBundle.pdf",
    "png puppy dog stock": "/WEBSITE SOURCE/T-SHIRT DESIGN/PNG Puppy Dog Stock Design Bundle/DOWNLOAD LINK/PuppyDogBundle.pdf",
    "new york city": "/WEBSITE SOURCE/T-SHIRT DESIGN/New York city, Brooklyn design bundle/DOWNLOAD LINK/NYCBrooklynBundle.pdf",
    "brooklyn design": "/WEBSITE SOURCE/T-SHIRT DESIGN/New York city, Brooklyn design bundle/DOWNLOAD LINK/NYCBrooklynBundle.pdf",
    "flower street wear": "/WEBSITE SOURCE/T-SHIRT DESIGN/Flower street wear design bundle/DOWNLOAD LINK/FlowerStreetwearBundle.pdf",
    "couple svg bundle": "/WEBSITE SOURCE/T-SHIRT DESIGN/Couple SVG Bundle/DOWNLOAD LINK/CoupleSVGBundle.pdf",
    "butterflies street wear": "/WEBSITE SOURCE/T-SHIRT DESIGN/Butterflies street wear design bundle/DOWNLOAD LINK/ButterfliesStreetwearBundle.pdf",
    "bear street wear": "/WEBSITE SOURCE/T-SHIRT DESIGN/Bear street wear design bundle/DOWNLOAD LINK/BearStreetwearBundle.pdf",
    "150+ car t-shirt": "/WEBSITE SOURCE/T-SHIRT DESIGN/150+ Car T-Shirt Designs/DOWNLOAD LINK/CarTShirtDesigns.pdf",
    "180+ smiley urban": "/WEBSITE SOURCE/T-SHIRT DESIGN/180+ Smiley Urban/DOWNLOAD LINK/SmileyUrbanBundle.pdf",
  }
  
  // Find matching download path using normalized titles
  for (const [key, path] of Object.entries(downloadMap)) {
    if (normalizedTitle.includes(key)) {
      console.log("[DownloadHelper] Match found", { key, path })
      return path
    }
  }
  
  // Log when no match is found
  console.warn("[DownloadHelper] No download path found for product", { 
    productTitle, 
    category,
    normalizedTitle 
  })
  
  // Default fallback - return empty string
  return ""
}

// Function to trigger file download
export function downloadFile(url: string, filename: string): boolean {
  try {
    console.log("[DownloadHelper] Attempting download", { url, filename })
    
    if (!url || url === "") {
      console.error("[DownloadHelper] Invalid download URL", { url, filename })
      return false
    }
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    
    // Make link invisible
    link.style.display = 'none'
    
    document.body.appendChild(link)
    
    // Use setTimeout to ensure the click happens after the element is attached
    setTimeout(() => {
      try {
        link.click()
        console.log("[DownloadHelper] Download initiated successfully", { url, filename })
      } catch (clickError) {
        console.error("[DownloadHelper] Click failed", { clickError, url, filename })
      } finally {
        // Remove link after a delay to ensure download starts
        setTimeout(() => {
          if (link && document.body.contains(link)) {
            document.body.removeChild(link)
          }
        }, 100)
      }
    }, 10)
    
    return true
  } catch (error) {
    console.error("[DownloadHelper] Download failed", { error, url, filename })
    return false
  }
}

// Function to download multiple files with delay
export async function downloadMultipleFiles(files: { url: string; filename: string }[]): Promise<number> {
  console.log("[DownloadHelper] Starting multiple file downloads", { count: files.length })
  
  if (files.length === 0) {
    console.warn("[DownloadHelper] No files to download")
    return 0
  }
  
  let successCount = 0
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    
    // Add delay between downloads to avoid browser blocking (except for first file)
    if (i > 0) {
      await new Promise(resolve => setTimeout(resolve, 800))
    }
    
    const success = downloadFile(file.url, file.filename)
    if (success) {
      successCount++
    }
  }
  
  console.log("[DownloadHelper] Multiple downloads completed", { 
    total: files.length, 
    successful: successCount,
    failed: files.length - successCount
  })
  
  return successCount
}



