import React, { useState } from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import Modal from "./Modal";
import Skeleton from "react-loading-skeleton";

const FlashCards = ({ FlashcardResponse }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1
				}
			}
		]
	};
	const [modalId, setModalId] = useState();

	return (
		<div className="tab-pane container fade" id="flash">
			{FlashcardResponse.data && (
				<React.Fragment>
					{FlashcardResponse.data.map((Flash, index) => (
						<div key={index}>
							<div className="chapter-title">
								<span>{index + 1}</span>
								{Flash.name ? Flash.name : <Skeleton width={150}/>}
							</div>

							<div className="top-content">
								<div className="container-fluid ">
									{Flash.flashCards ? (
										<Slider {...settings}>
											{Flash.flashCards.map(Content => (
												<div className="carousel-inner" key={Content.id}>
													<div className="carousel-box">
														<a
															href=""
															className="question"
															data-toggle="modal"
															data-target={"#flash-modal"}
															onClick={() => setModalId(Content.id)}
														>
															{" "}
															{Content.title}{" "}
														</a>
													</div>
												</div>
											))}
										</Slider>
									) : (
										<Slider {...settings}>
											<div className="carousel-inner">
												<div className="carousel-box">
													<Skeleton />
												</div>
											</div>
											<div className="carousel-inner">
												<div className="carousel-box">
													<Skeleton />
												</div>
											</div>
											<div className="carousel-inner">
												<div className="carousel-box">
													<Skeleton />
												</div>
											</div>
										</Slider>
									)}
								</div>
							</div>
						</div>
					))}

					<Modal id={modalId} />
				</React.Fragment>
			)}
		</div>
	);
};

export default FlashCards;
