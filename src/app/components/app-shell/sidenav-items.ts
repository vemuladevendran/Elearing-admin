export const menuItems = [
    ['dashboard_customize', 'Dashboard', ['/dashboard']],
    ['auto_stories', 'Course', ['/course']],
    ['library_books', 'Books', ['/books']],
    ['record_voice_over', 'Author', ['/authors']],
    ['person', 'Admin', ['/admin']],

].map(([icon, text, path]) => ({ icon, text, path }));