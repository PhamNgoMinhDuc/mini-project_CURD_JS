function save() {
	let fullName = document.getElementById("fullName").value;
	let email = document.getElementById("email").value;
	let phone = document.getElementById("phone").value;
	let address = document.getElementById("address").value;
	let gender = "";
	let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (document.getElementById("male").checked) {
		gender = document.getElementById("male").value;
	} else if (document.getElementById("female").checked) {
		gender = document.getElementById("female").value;
	}

	if (fullName.trim().length === 0) {
		fullName = "";
		document.getElementById("err-fullname").innerHTML = "Chưa nhập họ và tên";
	} else if (fullName.trim().length <= 7 || fullName.trim().length >= 30) {
		fullName = "";
		document.getElementById("err-fullname").innerHTML = "Nhập từ 8 ==> 30 ký tự";
	} else {
		document.getElementById("err-fullname").innerHTML = "";
	}

	if (!filter.test(email)) {
		email = "";
		document.getElementById("err-email").innerHTML = "Chưa nhập email";
	} else if (email.trim().length <= 7 || email.trim().length >= 30) {
		email = "";
		document.getElementById("err-email").innerHTML = "Nhập từ 8 ==> 30 ký tự";
	} else {
		document.getElementById("err-email").innerHTML = "";
	}

	if (phone.length === 0) {
		phone = "";
		document.getElementById("err-phone").innerHTML = "Chưa nhập số điện thoại";
	} else if (phone.length <= 8 || phone.length >= 12) {
		phone = "";
		document.getElementById("err-phone").innerHTML = "Nhập từ 9 ==> 11 ký tự";
	} else {
		document.getElementById("err-phone").innerHTML = "";
	}

	if (address.trim().length === 0) {
		address = "";
		document.getElementById("err-address").innerHTML = "Chưa nhập địa chỉ";
	} else if (address.trim().length <= 5 || address.trim().length >= 51) {
		address = "";
		document.getElementById("err-address").innerHTML = "Nhập từ 6 ==> 50 ký tự";
	} else {
		document.getElementById("err-address").innerHTML = "";
	}

	if (gender.length === 0) {
		gender = "";
		document.getElementById("err-gender").innerHTML = "Chưa nhập giới tính";
	} else {
		document.getElementById("err-gender").innerHTML = "";
	}

	if (fullName && email && phone && address && gender) {
		let students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];

		students.push({
			fullName: fullName,
			email: email,
			phone: phone,
			address: address,
			gender: gender,
		});

		localStorage.setItem("students", JSON.stringify(students));

		this.renderListStudents();
	}
}

function renderListStudents() {
	let students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];

	if (students.length === 0) {
		document.getElementById("students-grid").style.display = "none";
		return false;
	}
	document.getElementById("students-grid").style.display = "block";
	let tablecontent = `<tr>
        <th>STT</th>
        <th>Họ và tên</th>
        <th>Email</th>
        <th>Số điện thoại</th>
        <th>Địa chỉ</th>
        <th>Giới tính</th>
        <th>Hành động</th>
    </tr>`;

	students.forEach((student, index) => {
		let studentID = index;

		index++;

		let genderlabel = parseInt(student.gender) === 1 ? "Nam" : "Nữ";

		tablecontent += `<tr>
            <td>${index}</td>
            <td>${student.fullName}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.address}</td>
            <td>${genderlabel}</td>
            <td><a href="" onclick="editStudents(${studentID})"> Sửa </a> | <a href="" onclick="deleteStudents(${studentID})"> Xóa </a></td>
        </tr>`;
	});
	document.getElementById("students-view").innerHTML = tablecontent;
}

function deleteStudents(id) {
	let students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];

	students.splice(id, 1);

	localStorage.setItem("students", JSON.stringify(students));

	renderListStudents();
}

function editStudents(id) {
	let students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem("students")) : [];

	document.getElementById("fullName").value = `${students[id].fullName}`;
	document.getElementById("email").value = `${students[id].email}`;
	document.getElementById("phone").value = `${students[id].phone}`;
	document.getElementById("address").value = `${students[id].address}`;

	localStorage.setItem("students", JSON.stringify(students));

	renderListStudents();
}
