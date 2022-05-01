export const menuItems = [
    ['dashboard_customize', 'Dashboard', ['/dashboard']],
    ['auto_stories', 'Course', ['/course']],
    ['library_books', 'Books', ['/books']],
    ['peoples', 'Students', ['/students']],
    ['record_voice_over', 'Author', ['/authors']],
    ['pending_actions', 'Request Pending', ['/student-request']],
    ['person', 'Admin', ['/admin']],

].map(([icon, text, path]) => ({ icon, text, path }));