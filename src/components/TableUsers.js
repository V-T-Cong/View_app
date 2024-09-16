import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/User.services";
import ReactPaginate from "react-paginate";

const TablesUsers = (props) => {
	const [listUsers, setlistUsers] = useState([]);
	const [totalUser, setTotalUsers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		// call APIS
		getUsers(2);
	}, []);

	const getUsers = async (page) => {
		let res = await fetchAllUser(page);
		console.log('New Response::', res);
		if (res && res.data && res.data.data) {
			setTotalUsers(res.data.total);
			setlistUsers(res.data.data);
			setTotalPages(res.data.total_pages);
		}
	};

	const handlePageClick = (event) => {
		console.log('event library:: ', event);
		getUsers(+event.selected + 1)
	};
	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>	
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
				</thead>
				<tbody>
					{listUsers &&
						listUsers.length > 0 &&
						listUsers.map((item, index) => {
							return (
								<tr key={`users-${index}`}>
									<td>{item.id}</td>
									<td>{item.email}</td>
									<td>{item.first_name}</td>
									<td>{item.last_name}</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={totalPages}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
			/>
		</>
	);
};