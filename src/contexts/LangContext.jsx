import { createContext, useContext, useState, useEffect } from 'react'

const translations = {
    ar: {
        nav_home: 'الرئيسية', nav_vehicles: 'المركبات', nav_mechanics: 'الميكانيكيون',
        nav_login: 'تسجيل الدخول', nav_register: 'التسجيل', nav_dashboard: 'لوحة التحكم', nav_logout: 'تسجيل الخروج',
        hero_title: 'سوقك المتكامل للمركبات', hero_subtitle: 'اعثر على سيارتك المثالية أو ميكانيكيك الموثوق في مكان واحد',
        hero_cta_vehicles: 'ابحث عن مركبة', hero_cta_mechanics: 'ابحث عن ميكانيكي',
        search_placeholder: 'ابحث عن مركبة أو ميكانيكي...', search_btn: 'بحث',
        filter_brand: 'الماركة', filter_city: 'المدينة', filter_spec: 'التخصص',
        all_brands: 'كل الماركات', all_cities: 'كل المدن', all_specs: 'كل التخصصات',
        featured_vehicles: 'مركبات مميزة', top_mechanics: 'أفضل الميكانيكيين',
        how_it_works: 'كيف تعمل المنصة؟', testimonials: 'آراء عملائنا',
        step1_title: 'ابحث', step1_desc: 'استخدم محرك البحث المتقدم للعثور على ما تحتاجه بسرعة وسهولة',
        step2_title: 'تواصل', step2_desc: 'تواصل مباشرة مع البائع أو الميكانيكي عبر المنصة بأمان وسرية',
        step3_title: 'احجز', step3_desc: 'احجز موعد الصيانة أو أتمم صفقة شراء المركبة بكل ثقة',
        km: 'كم', year: 'سنة', view_details: 'عرض التفاصيل', contact_seller: 'تواصل مع البائع',
        similar_vehicles: 'مركبات مشابهة', years_exp: 'سنوات خبرة',
        book_appointment: 'احجز موعد', view_profile: 'عرض الملف', rating: 'التقييم',
        specialties: 'التخصصات', reviews: 'مراجعة',
        vehicles_marketplace: 'سوق المركبات', sort_by: 'ترتيب حسب',
        sort_newest: 'الأحدث', sort_price_low: 'الأقل سعراً', sort_price_high: 'الأعلى سعراً', sort_popular: 'الأكثر شعبية',
        results_found: 'نتيجة', load_more: 'تحميل المزيد', filters: 'الفلاتر',
        price_range: 'نطاق السعر', fuel_type: 'نوع الوقود', transmission: 'ناقل الحركة',
        color: 'اللون', min_price: 'أدنى سعر', max_price: 'أعلى سعر',
        basic_info: 'المعلومات الأساسية', detailed_desc: 'الوصف التفصيلي',
        specs: 'المواصفات الفنية', seller_info: 'معلومات البائع',
        fuel_gasoline: 'بنزين', fuel_diesel: 'ديزل', fuel_electric: 'كهربائي', fuel_hybrid: 'هايبرد',
        trans_auto: 'أوتوماتيك', trans_manual: 'عادي',
        mechanics_directory: 'دليل الميكانيكيين', sort_rating: 'الأعلى تقييماً', sort_experienced: 'الأكثر خبرة',
        login: 'تسجيل الدخول', register: 'التسجيل', email: 'البريد الإلكتروني',
        password: 'كلمة المرور', confirm_password: 'تأكيد كلمة المرور', full_name: 'الاسم الكامل',
        forgot_password: 'نسيت كلمة المرور؟', no_account: 'ليس لديك حساب؟', have_account: 'لديك حساب بالفعل؟',
        role_user: 'مستخدم عادي', role_mechanic: 'ميكانيكي', select_role: 'اختر نوع الحساب',
        login_google: 'الدخول بـ Google', login_facebook: 'الدخول بـ Facebook',
        dashboard: 'لوحة التحكم', my_profile: 'ملفي الشخصي', my_vehicles: 'مركباتي',
        my_services: 'خدماتي', my_appointments: 'مواعيدي', my_ratings: 'تقييماتي', settings: 'الإعدادات',
        total_vehicles: 'إجمالي المركبات', upcoming_appointments: 'المواعيد القادمة', avg_rating: 'متوسط التقييم',
        add_vehicle: 'إضافة مركبة', add_service: 'إضافة خدمة',
        edit: 'تعديل', delete: 'حذف', accept: 'قبول', reject: 'رفض', cancel: 'إلغاء',
        pending: 'قيد الانتظار', confirmed: 'مؤكد', completed: 'مكتمل', cancelled: 'ملغي',
        select_date: 'اختر التاريخ', select_time: 'اختر الوقت', service_type: 'نوع الخدمة',
        notes: 'ملاحظات', confirm_booking: 'تأكيد الحجز', booking_success: 'تم الحجز بنجاح!',
        about: 'عن المنصة', contact: 'اتصل بنا', privacy: 'سياسة الخصوصية', terms: 'شروط الاستخدام',
        footer_desc: 'منصتك المتكاملة للبحث عن المركبات وخدمات الصيانة الموثوقة', rights: 'جميع الحقوق محفوظة',
        sar: 'ر.س', view_all: 'عرض الكل', back: 'رجوع', save: 'حفظ', submit: 'إرسال',
        loading: 'جاري التحميل...', no_results: 'لا توجد نتائج',
        select_country: 'الدولة', select_city: 'المدينة', welcome: 'مرحباً',
    },
    en: {
        nav_home: 'Home', nav_vehicles: 'Vehicles', nav_mechanics: 'Mechanics',
        nav_login: 'Login', nav_register: 'Register', nav_dashboard: 'Dashboard', nav_logout: 'Logout',
        hero_title: 'Your Complete Vehicle Marketplace', hero_subtitle: 'Find your perfect car or trusted mechanic all in one place',
        hero_cta_vehicles: 'Find a Vehicle', hero_cta_mechanics: 'Find a Mechanic',
        search_placeholder: 'Search for a vehicle or mechanic...', search_btn: 'Search',
        filter_brand: 'Brand', filter_city: 'City', filter_spec: 'Specialty',
        all_brands: 'All Brands', all_cities: 'All Cities', all_specs: 'All Specialties',
        featured_vehicles: 'Featured Vehicles', top_mechanics: 'Top Mechanics',
        how_it_works: 'How It Works', testimonials: "What Our Clients Say",
        step1_title: 'Search', step1_desc: 'Use our advanced search to quickly find exactly what you need',
        step2_title: 'Connect', step2_desc: 'Contact sellers or mechanics directly through the platform safely',
        step3_title: 'Book', step3_desc: 'Schedule maintenance or complete a purchase with full confidence',
        km: 'km', year: 'yr', view_details: 'View Details', contact_seller: 'Contact Seller',
        similar_vehicles: 'Similar Vehicles', years_exp: 'yrs experience',
        book_appointment: 'Book Appointment', view_profile: 'View Profile', rating: 'Rating',
        specialties: 'Specialties', reviews: 'reviews',
        vehicles_marketplace: 'Vehicles Marketplace', sort_by: 'Sort By',
        sort_newest: 'Newest', sort_price_low: 'Lowest Price', sort_price_high: 'Highest Price', sort_popular: 'Most Popular',
        results_found: 'results', load_more: 'Load More', filters: 'Filters',
        price_range: 'Price Range', fuel_type: 'Fuel Type', transmission: 'Transmission',
        color: 'Color', min_price: 'Min Price', max_price: 'Max Price',
        basic_info: 'Basic Information', detailed_desc: 'Detailed Description',
        specs: 'Technical Specs', seller_info: 'Seller Information',
        fuel_gasoline: 'Gasoline', fuel_diesel: 'Diesel', fuel_electric: 'Electric', fuel_hybrid: 'Hybrid',
        trans_auto: 'Automatic', trans_manual: 'Manual',
        mechanics_directory: 'Mechanics Directory', sort_rating: 'Highest Rated', sort_experienced: 'Most Experienced',
        login: 'Login', register: 'Register', email: 'Email',
        password: 'Password', confirm_password: 'Confirm Password', full_name: 'Full Name',
        forgot_password: 'Forgot Password?', no_account: "Don't have an account?", have_account: 'Already have an account?',
        role_user: 'Regular User', role_mechanic: 'Mechanic', select_role: 'Select Account Type',
        login_google: 'Continue with Google', login_facebook: 'Continue with Facebook',
        dashboard: 'Dashboard', my_profile: 'My Profile', my_vehicles: 'My Vehicles',
        my_services: 'My Services', my_appointments: 'Appointments', my_ratings: 'My Ratings', settings: 'Settings',
        total_vehicles: 'Total Vehicles', upcoming_appointments: 'Upcoming Appointments', avg_rating: 'Average Rating',
        add_vehicle: 'Add Vehicle', add_service: 'Add Service',
        edit: 'Edit', delete: 'Delete', accept: 'Accept', reject: 'Reject', cancel: 'Cancel',
        pending: 'Pending', confirmed: 'Confirmed', completed: 'Completed', cancelled: 'Cancelled',
        select_date: 'Select Date', select_time: 'Select Time', service_type: 'Service Type',
        notes: 'Notes', confirm_booking: 'Confirm Booking', booking_success: 'Booking Confirmed!',
        about: 'About Us', contact: 'Contact Us', privacy: 'Privacy Policy', terms: 'Terms of Use',
        footer_desc: 'Your integrated platform for finding vehicles and trusted maintenance services', rights: 'All Rights Reserved',
        sar: 'SAR', view_all: 'View All', back: 'Back', save: 'Save', submit: 'Submit',
        loading: 'Loading...', no_results: 'No results found',
        select_country: 'Country', select_city: 'City', welcome: 'Welcome',
    }
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
    const [lang, setLang] = useState('ar')

    useEffect(() => {
        document.documentElement.lang = lang
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    }, [lang])

    const t = (key) => translations[lang][key] || key
    const toggleLang = () => setLang(l => l === 'ar' ? 'en' : 'ar')
    const isRTL = lang === 'ar'

    return (
        <LangContext.Provider value={{ lang, t, toggleLang, isRTL }}>
            {children}
        </LangContext.Provider>
    )
}

export const useLang = () => useContext(LangContext)
