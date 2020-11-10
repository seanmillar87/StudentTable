class StudentGradesTable {
    constructor() {
        this.apiBaseUrl = 'http://localhost:57032/api/v1.0/SchoolGrade/';

        this.studentsData = [];
        this.gradesData = [];
        this.coursesData = [];

        this.initialize();
    }

    async initialize() {
        /*
        todo: create another class to interface and retrieve the data, merge and import it,
        as doing them in the same file might be violating single responsibility.
        */
        this.studentsData = await this.getDataFromEndpoint(this.apiBaseUrl + 'get-students');
        this.gradesData = await this.getDataFromEndpoint(this.apiBaseUrl + 'get-school-grades');
        this.coursesData = await this.getDataFromEndpoint(this.apiBaseUrl + 'get-courses');

        this.populateStudentGradesTable(this.mergeStudentsWithGrades());
        this.populateStudentSelectDropdown(this.studentsData);
        this.onStudentSelectChangeHideEntries();
        this.bindClearSelectionButton();
    }

    async getDataFromEndpoint(url) {
        try{
            const response = await fetch(url);
            const json =  await response.json();
            return json;
        }
        catch(e) {
            console.log(e);
        }
    }

    populateStudentGradesTable(mergedStudentsWithGrades) {
        // todo: I call StudentGradesTable twice in different methods, put it more global
        const StudentGradesTable = document.getElementById('StudentGradesTable');
        if (!StudentGradesTable) {
            console.error('StudentGradesTable not found');
        }

        mergedStudentsWithGrades.forEach((student, index) => {
            const row = StudentGradesTable.insertRow(index + 1);
            row.setAttribute('data-student-id', student.studentId);

            const nameCell = row.insertCell(0);
            nameCell.innerHTML = student.name;

            const gradesCell = row.insertCell(1);

            /*
                todo: This could be it's own method probably, also a better way
                using a string array and .join maybe?
            */
            student.grades.forEach((grade) => {
                gradesCell.innerHTML = gradesCell.innerHTML +
                `<div>
					${grade.gradeValue} 
					<span class="ProgrammeName">${this.getCourseNameFromId(grade.courseId)}</span>
				</div>`;
            });

            const passedCell = row.insertCell(2);
            passedCell.innerHTML = (this.hasStudentPassedTheirCourse(student)) ? 'Passed' : 'Failed';
        });
    }

    getCourseNameFromId(id) {
        return this.coursesData.find(course => course.courseId === id).courseName;
    }

    hasStudentPassedTheirCourse(student) {
        const gradesOnly = student.grades.map(grade => grade.gradeValue.charAt(0));
        const hasGreaterThanCGrade = gradesOnly.find(grade => grade > 'C') === undefined;

        return student.grades.length >= 3 && hasGreaterThanCGrade;
    }

    mergeStudentsWithGrades() {
        return this.studentsData.map((student, i) => {
            const gradesContainer = [];

            gradesContainer.studentId = student.studentId;
            gradesContainer.name = student.name;
            gradesContainer.grades = [];

            this.gradesData.forEach((grade) => {
                if(student.studentId === grade.studentId) {
                    /*
                        todo: Remove StudentId from the grades array being pushed here
                        and add course name instead so we don't have the need for the
                        GetCourseNameFromId function?
                     */
                    gradesContainer.grades.push(grade);
                }
            });

            return gradesContainer;
        });
    }

    populateStudentSelectDropdown(students) {
        const studentSelector = document.getElementById('StudentSelector');
        if (!studentSelector) {
            console.error('studentSelector not found');
        }
        students.forEach((student) => {
            studentSelector.options[studentSelector.options.length] = new Option(student.name, student.studentId);
        });
    }

    onStudentSelectChangeHideEntries() {
        const studentSelector = document.getElementById('StudentSelector');
        const StudentGradesTable = document.getElementById('StudentGradesTable');
        if (!studentSelector || !StudentGradesTable) {
            console.error('studentSelector or StudentGradesTable not found');
        }

        const StudentGradesTableRows = StudentGradesTable.querySelectorAll('tr:not(.Header)');
        studentSelector.addEventListener('change', () => {
            StudentGradesTableRows.forEach((row) => {
	            row.classList.remove('Hidden');
                if (row.dataset.studentId !== studentSelector.value) {
                    row.classList.add('Hidden');
                }
            });
        });
    }

    bindClearSelectionButton() {
        const clearSelectionButton = document.getElementById('ClearSelectionButton');
        if (!clearSelectionButton) {
            console.error('clearSelectionButton or StudentGradesTable not found');
        }

        clearSelectionButton.addEventListener('click', () => {
            const tableRows = document.querySelectorAll('#StudentGradesTable tr');
            tableRows.forEach((row) => row.classList.remove('Hidden'));
        });
    }
}

new StudentGradesTable();