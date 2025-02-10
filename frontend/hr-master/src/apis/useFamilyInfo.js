import { useState, useEffect } from 'react';
import axios from 'axios';

export function useGetFamilyInfo(employeeId) {
	const [familyInfo, setFamilyInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!employeeId) return;

		const fetchFamily = async () => {
			try {
				const response = await axios.get(`/employees/${employeeId}/familyInfo`);
				setFamilyInfo(response.data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchFamily();
	}, [employeeId]);

	return { familyInfo, loading, error };
}
