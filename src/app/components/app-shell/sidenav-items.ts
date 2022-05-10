export const menuItems = [
    ['dashboard_customize', 'Dashboard', ['/dashboard']],
    ['auto_stories', 'Course', ['/course']],
    ['library_books', 'Books', ['/books']],
    ['shopping_cart', 'Orders', ['/orders']],
    ['dvr', 'Issue Book', ['/issue-book-dashboard']],
    ['peoples', 'Students', ['/students']],
    ['category', 'Category', ['/category']],
    ['record_voice_over', 'Author', ['/authors']],
    ['pending_actions', 'Request Pending', ['/student-request']],
    ['pending', 'Course Request Pending', ['/course-request']],
    ['person', 'Admin', ['/admin']],

].map(([icon, text, path]) => ({ icon, text, path }));