let url = new URL(window.location.href);
//[-----------------------------LỌC DATA-------------------------------]
//filter status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length) {
  buttonStatus.forEach((ele) => {
    ele.addEventListener("click", () => {
      const status = ele.getAttribute("button-status");
      if (status != "") {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      url.searchParams.delete("pages");
      window.location.href = url.href;
    });
  });
}
//end filter status
//filter search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = e.target.elements.keyword.value;
    if (value) {
      url.searchParams.set("keyword", value);
    } else {
      url.searchParams.delete("keyword");
    }
    url.searchParams.delete("pages");
    window.location.href = url.href;
  });
}
//end filter search
//pagination
const pagination = document.querySelectorAll(".page-link");
if (pagination.length) {
  pagination.forEach((ele) => {
    ele.addEventListener("click", () => {
      const pageNumber = ele.getAttribute("button-pagination");
      if (pageNumber != 1) {
        url.searchParams.set("pages", pageNumber);
      } else {
        url.searchParams.delete("pages");
      }
      window.location.href = url.href;
    });
  });
}
//end pagination
//[-----------------------------THAY ĐỔI DATA-------------------------------]
//change status
const formChangeStatus = document.querySelector("#form-change-status");
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (formChangeStatus && buttonChangeStatus.length) {
  buttonChangeStatus.forEach((ele) => {
    ele.addEventListener("click", () => {
      let status = ele.getAttribute("data-status");
      if (status == "active") status = "inactive";
      else status = "active";
      const id = ele.getAttribute("data-id");
      const action =
        formChangeStatus.getAttribute("data-path") +
        `/${id}/${status}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
//end change status
//change multi status, multi delete
const formChangeMultiStatus = document.querySelector("[form-change-multi]");
const checkBoxAll = document.querySelector('[name="checkall"]');
const checkBoxList = document.querySelectorAll('[name="id"]');
if (formChangeMultiStatus && checkBoxList.length && checkBoxAll) {
  //function display submit
  const displaySubmitChangMulti = () => {
    let checkedBoxList = document.querySelectorAll('[name="id"]:checked');
    if (checkedBoxList.length) {
      formChangeMultiStatus.classList.remove("d-none");

      if (checkedBoxList.length == checkBoxList.length) {
        checkBoxAll.checked = true;
      } else {
        checkBoxAll.checked = false;
      }
    } else {
      formChangeMultiStatus.classList.add("d-none");
      checkBoxAll.checked = false;
    }
  };
  //display submit
  checkBoxAll.addEventListener("click", () => {
    if (checkBoxAll.checked) {
      checkBoxList.forEach((e) => {
        e.checked = true;
      });
    } else {
      checkBoxList.forEach((e) => {
        e.checked = false;
      });
    }
    displaySubmitChangMulti();
  });
  checkBoxList.forEach((ele) => {
    ele.addEventListener("click", displaySubmitChangMulti);
  });
  //submit form
  formChangeMultiStatus.addEventListener("submit", (e) => {
    e.preventDefault();
    let checkedBoxList = document.querySelectorAll('[name="id"]:checked');
    const listID = formChangeMultiStatus.querySelector('[name="ids"]');
    if (checkedBoxList.length) {
      checkedBoxList.forEach((ele) => {
        listID.value += ele.value + " ";
      });
      let isConfirm = true;
      if (e.target.elements.type.value === "delete-all") {
        const confirmDelete = confirm("Bạn muốn chắc xóa các sản phẩm này ?");
        if (!confirmDelete) isConfirm = false;
      }
      if (isConfirm) formChangeMultiStatus.submit();
    } else {
      alert("vui lòng chọn ít nhất 1 bản ghi");
    }
  });
}
//end change multi status, multi delete
//delete filter
const buttonDelete = document.querySelectorAll("[button-delete]");
const formDelete = document.querySelector("#form-delete-item");
if (buttonDelete.length && formDelete) {
  buttonDelete.forEach((ele) => {
    ele.addEventListener("click", () => {
      const confirmDelete = confirm("Bạn muốn xóa vĩnh viễn bản ghi này ?");
      if (confirmDelete) {
        const action =
          formDelete.getAttribute("data-path") +
          "/" +
          ele.getAttribute("data-id") +
          "?_method=DELETE";
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}
//end delete filter
//change position
const buttonChangePositionList = document.querySelectorAll(
  "[button-change-position]"
);
const buttonCancelSwap = document.querySelector(
  "[button-cancel-selected-swap]"
);
const formChangePosition = document.querySelector("#form-change-position");
if (buttonCancelSwap && buttonChangePositionList.length && formChangePosition) {
  buttonCancelSwap.addEventListener("click", () => {
    window.history.back();
  });
  buttonChangePositionList.forEach((ele) => {
    ele.addEventListener("click", () => {
      formChangePosition.action =
        formChangePosition.getAttribute("data-path") +
        "/" +
        buttonCancelSwap.getAttribute("data-id") +
        "/" +
        ele.getAttribute("data-id") +
        "?_method=PATCH";
      formChangePosition.submit();
    });
  });
}
//end change position
//show alert
const alertMessenger = document.querySelectorAll("[show-alert]");
if (alertMessenger.length) {
  alertMessenger.forEach((ele) => {
    const time = ele.getAttribute("data-time");
    const cancelAlert = ele.querySelector("[close-alert]");
    cancelAlert.addEventListener("click", () => {
      ele.classList.add("alert-hidden");
    });
    setTimeout(() => {
      ele.classList.add("alert-hidden");
    }, parseInt(time));
  });
}
//end show alert
//preview ảnh
const upLoadImage = document.querySelector("[upload-image-input]");
const upLoadImagePreview = document.querySelector("[upload-image-preview]");
if (upLoadImage && upLoadImagePreview) {
  upLoadImage.addEventListener("change", () => {
    if (upLoadImage.files && upLoadImage.files[0]) {
      upLoadImagePreview.src = URL.createObjectURL(upLoadImage.files[0]);
    }
  });
}
//end preview ảnh
//form edit product
//button hủy
const buttonCancelEdit = document.querySelector("[button-cancel-edit]");
if (buttonCancelEdit) {
  buttonCancelEdit.addEventListener("click", () => {
    const pathArray = url.pathname.split("/");
    const newPathname = `/${pathArray[1]}/${pathArray[2]}`;
    window.location.href = newPathname;
  });
}
//end button hủy
//form edit product
//back filter
const backFilter = document.querySelector("[button-back]");
if (backFilter) {
  backFilter.addEventListener("click", () => {
    window.history.back();
  });
}
//end back filter
