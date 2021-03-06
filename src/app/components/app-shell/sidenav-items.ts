export const menuItems = [
    ['dashboard_customize', 'Dashboard', ['/dashboard']],
    ['auto_stories', 'Course', ['/course']],
    ['library_books', 'Books', ['/books']],
    ['shopping_cart', 'Orders', ['/orders']],
    ['shop_two', 'Purchased Courses', ['/purchased-courses']],
    ['dvr', 'Issue Book', ['/issue-book-dashboard']],
    ['peoples', 'Students', ['/students']],
    ['category', 'Category', ['/category']],
    ['record_voice_over', 'Author', ['/authors']],
    ['pending_actions', 'Request Pending', ['/student-request']],
    ['pending', 'Course Request Pending', ['/course-request']],
    ['bug_report', 'Payment Issues', ['/issue']],
    ['person', 'Admin', ['/admin']],

].map(([icon, text, path]) => ({ icon, text, path }));