function skillsMember() {
    var skills = document.getElementById('skills');
    var skillsList = document.getElementById('skillsList');

    skills.addEventListener('click', function() {
        skillsList.classList.toggle('active');
    });
}
