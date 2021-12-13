import { Typography, Container, Grid, Divider } from '@mui/material';
import useStyles from './styles';
import { connect } from 'react-redux';
import CartItem from '../../CartItem/CartItem';
import "./Checkout.css";

const Checkout = ({ cart }) => {
	const classes = useStyles();

	const renderCartItems = () => {
		return cart.orders.map((item) => <CartItem {...item} />);
	};

	const cleanedCartItems = cart.orders.map((orderItem)=> {
		return {
			id: orderItem.product.id,
			quantity: orderItem.quantity
		}
	})
	//[{id: X, quantity: Y}, {}, {}....] 

	const stringifiedCartItems = JSON.stringify(cleanedCartItems);

	return (
		<div id="Checkout__screen" className={classes.screen}>
			<Grid container xs={12}>
				<Grid container xs={2}>
					{/* Intentionally left empty */}
				</Grid>
				<Grid container xs={4} spacing={4} justify="center">
					<Container maxWidth="sm">
						<div className={classes.productHeader}>
							<Typography variant="h1" className={classes.productsTitle}>
								Checkout
							</Typography>
						</div>
						<Grid container spacing={2} justify="center" >
							<Grid item xs={12}>
								{renderCartItems()}
							</Grid>
						</Grid>

						<Divider style={{ marginBottom: 20 }} />
						<Grid container spacing={2} justify="center">
							<Grid item xs={10}>
								Subtotal:
							</Grid>
							<Grid item xs={2}>
								{cart.productPrice} kr
							</Grid>
							<Grid item xs={10}>
								Shipping:
							</Grid>
							<Grid item xs={2}>
								{cart.deliveryFee} kr
							</Grid>
							<Grid item xs={10}>
								Total:
							</Grid>
							<Grid item xs={2}>
								{cart.totalPrice} kr
							</Grid>
						</Grid>
					</Container>
				</Grid>
				<Grid container xs={4}>
					<Container maxWidth="sm" className="holds-the-iframe">
						<iframe src={"http://localhost:3001/checkout/BBB-123?cartItems="+stringifiedCartItems} frameBorder={"none"} height="900px" width="100%"/>
					</Container>
				</Grid>
				<Grid container xs={2}>
					{/* Intentionally left empty */}
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		cart: state.cart
	};
};

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)