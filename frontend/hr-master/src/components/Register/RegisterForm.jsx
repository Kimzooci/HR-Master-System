import { useState } from 'react';
import Input from '../common/Input/Input';
import Dropdown from '../common/Dropdown/Dropdown';
import { useRegisterEmployee } from '../../apis/useEmployees';
import { useAddExternalCareers } from '../../apis/useCareer';
import {
	hireOptions,
	militaryOptions,
	workLocationOptions,
	departmentOptions,
	positionOptions,
	genderOptions,
	retireClsOptions,
} from '../../constants/options';
import './RegisterForm.css';

export default function RegisterForm() {
	const { registerEmployee, loading: employeeLoading, error: employeeError } = useRegisterEmployee();
	const { addExternalCareer, loading: careerLoading, error: careerError } = useAddExternalCareers();

	const [formData, setFormData] = useState({
		employeeId: '',
		ssn: '',
		gender: '',
		phone: '',
		empName: '',
		empEngName: '',
		hireDate: '',
		nationality: '',
		militaryService: '',
		address: '',
		detailAddress: '',
		hireType: '',
		workLocation: '',
		department: '',
		position: '',
		companyWork: '',
		evaluationFlag: '',
		companyEmail: '',
		companyPhone: '',
		retireCls: '',
	});

	const [externalCareer, setExternalCareer] = useState({
		companyName: '',
		jobTitle: '',
		position: '',
		hireDate: '',
		resignationDate: '',
		annualSalary: '',
	});

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleDropdownChange = (field, selected) => {
		setFormData((prev) => ({
			...prev,
			[field]: selected,
		}));
	};

	const handleCareerChange = (e) => {
		const { id, value } = e.target;
		setExternalCareer((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const registeredEmployee = await registerEmployee(formData);

			const employeeId = registeredEmployee?.employeeId;
			if (!employeeId) {
				throw new Error('사원 ID를 가져올 수 없습니다.');
			}

			if (formData.hireType === '경력') {
				await addExternalCareer(employeeId, externalCareer);
			}

			alert('사원이 등록되었습니다.');
			setFormData({
				employeeId: '',
				ssn: '',
				gender: '',
				phone: '',
				empName: '',
				empEngName: '',
				hireDate: '',
				nationality: '',
				militaryService: '',
				address: '',
				detailAddress: '',
				hireType: '',
				workLocation: '',
				department: '',
				position: '',
				companyWork: '',
				evaluationFlag: '',
				companyEmail: '',
				companyPhone: '',
				retireCls: '',
			});

			setExternalCareer({
				companyName: '',
				jobTitle: '',
				position: '',
				hireDate: '',
				resignationDate: '',
				annualSalary: '',
			});
		} catch (error) {
			alert('사원 등록 중 오류가 발생했습니다.');
		}
	};

	const style = {
		width: '50rem',
	};

	return (
		<div className="infoContainer">
			<form className="infoForm" onSubmit={handleSubmit}>
				<h3>개인정보</h3>
				<div className="row">
					<Input id="ssn" label="주민번호" onChange={handleInputChange} style={style} />
					<Dropdown
						label="성별"
						menuItems={genderOptions}
						onSelect={(val) => handleDropdownChange('gender', val)}
						style={style}
					/>
				</div>
				<div className="row">
					<Dropdown
						label="재직 구분"
						menuItems={retireClsOptions}
						onSelect={(val) => handleDropdownChange('retireCls', val)}
					/>
					<Input id="empName" label="이름" onChange={handleInputChange} />
					<Input id="empEngName" label="영문 이름" onChange={handleInputChange} />
				</div>
				<div className="row">
					<Input id="hireDate" type="date" label="입사일" onChange={handleInputChange} />
					<Input id="phone" label="연락처" onChange={handleInputChange} />
					<Input id="nationality" label="국적" onChange={handleInputChange} />
				</div>
				<div className="row">
					<Dropdown
						label="군필 여부"
						menuItems={militaryOptions}
						onSelect={(val) => handleDropdownChange('militaryService', val)}
					/>
					<Input id="address" label="주소" onChange={handleInputChange} />
					<Input id="detailAddress" label="상세 주소" onChange={handleInputChange} />
				</div>

				{/* 근무 정보 */}
				<h3>근무정보</h3>
				<div className="row">
					<Dropdown
						label="입사 구분"
						menuItems={hireOptions}
						onSelect={(val) => handleDropdownChange('hireType', val)}
					/>
					<Dropdown
						label="근무지"
						menuItems={workLocationOptions}
						onSelect={(val) => handleDropdownChange('workLocation', val)}
					/>
					<Dropdown
						label="부서"
						menuItems={departmentOptions}
						onSelect={(val) => handleDropdownChange('department', val)}
					/>
				</div>
				<div className="row">
					<Dropdown
						label="직급"
						menuItems={positionOptions}
						onSelect={(val) => handleDropdownChange('position', val)}
					/>
					<Input id="companyWork" label="회사 근무 사항" onChange={handleInputChange} />
					<Input id="evaluationFlag" label="고과 여부" onChange={handleInputChange} />
				</div>
				<div className="row">
					<Input id="companyEmail" type="email" label="사내 메일" style={style} onChange={handleInputChange} />
					<Input id="companyPhone" label="사내 전화" style={style} onChange={handleInputChange} />
				</div>

				{/* 사외 경력 정보 */}
				{formData.hireType === '경력' && (
					<>
						<h3>사외 경력</h3>
						<div className="row">
							<Input id="companyName" label="회사명" onChange={handleCareerChange} />
							<Input id="jobTitle" label="직무" onChange={handleCareerChange} />
							<Input id="position" label="직급" onChange={handleCareerChange} />
						</div>
						<div className="row">
							<Input id="hireDate" type="date" label="입사일" onChange={handleCareerChange} />
							<Input id="resignationDate" type="date" label="퇴사일" onChange={handleCareerChange} />
							<Input id="annualSalary" label="연봉" onChange={handleCareerChange} />
						</div>
					</>
				)}

				<button type="submit" disabled={employeeLoading || careerLoading}>
					{employeeLoading || careerLoading ? '등록 중...' : 'Add Staff'}
				</button>
				{(employeeError || careerError) && (
					<p className="error">오류 발생: {employeeError?.message || careerError?.message}</p>
				)}
			</form>
		</div>
	);
}
