import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Modal, Form, Button, Tabs, Tab, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listProductDetails,
  updateProduct,
  addProductSupplier,
  updateProductSupplier,
  updateProductSupplierById,
} from "../actions/productActions";
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_ADD_SUPPLIER_RESET,
  PRODUCT_UPDATE_SUPPLIER_RESET,
} from "../constants/productConstants";
import { set } from "mongoose";
import AddProductSupplier from "../components/AddProductSupplier";
import { Breadcrumbs } from "../components/misc/Breadcrumbs";
import { listCategories } from "../actions/categoryActions";
import { toast } from "react-toastify";
import { DefaultButton } from "../components/buttons/DefaultButton";
import TableContainer from "../components/TableContainer";
import ProductSuppliersTab from "../components/product/ProductSuppliersTab";

const ProductEditScreen = ({ match, history }) => {
  const productId = useParams().id;
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const [supplierId, setSupplierId] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [mpn, setMpn] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [contents, setContents] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [vat, setVat] = useState(0);

  const [supplierName, setSupplierName] = useState("");
  const [supplierPrice, setSupplierPrice] = useState(0);

  const [supplier, setSupplier] = useState({
    name: supplierName,
    price: supplierPrice,
  });
  const [suppliers, setSuppliers] = useState([]);

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const currentSuppliers = product.suppliers || [];

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { loadingCategories, errorCategories, categories } = categoryList;

  console.log("Categories", categories);

  console.log("supplierId", supplierId);
  console.log("supplierPrice", supplierPrice);

  useEffect(() => {
    dispatch(listCategories());
    if (successUpdate) {
      toast.success("Product Successfully Updated!");
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/products");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setPrice(product.price);
        setName(product.name);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setSku(product.sku);
        setMpn(product.mpn);
        setLongDescription(product.longDescription);
        setContents(product.contents);
        setManufacturer(product.manufacturer);
        setVat(product.vat);
        setSupplierId(supplierId);
        setSupplierPrice(supplierPrice);
        setSuppliers(...product.suppliers, {
          name: supplierName,
          price: supplierPrice,
        });
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error("Upload failed");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        sku,
        mpn,
        longDescription,
        contents,
        manufacturer,
        vat,
        suppliers,
      })
    );
  };

  const categorySelectChangeHandler = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

  const editSupplierHandler = (e) => {
    e.preventDefault();

    console.log(supplierId);

    console.log(productId);

    navigate(`/admin/product/${productId}/suppliers/${supplierId}`);
    setShow(true);
  };

  const updateSupplierHandler = () => {
    dispatch(
      updateProductSupplierById(productId, supplierId, {
        price: supplierPrice,
      })
    );
  };

  const openModal = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <>
      <Wrapper>
        <InnerHeader>
          <InnerHeaderLeft>
            <Breadcrumbs label1="Admin" label2="Categories" />
          </InnerHeaderLeft>
          <InnerHeaderRight>
            <DefaultButton
              form="product-edit"
              type="submit"
              variant="primary"
              label="Update Product"
            />
          </InnerHeaderRight>
        </InnerHeader>

        <Main>
          <InnerWrapper>
            <Top>
              <TopLeft>
                <TitleWrapper>
                  <Title>
                    {product.name}
                    <span>{product.description}</span>
                  </Title>
                </TitleWrapper>
                <InfoWrapper>
                  <InfoLeft>
                    <InfoList>
                      <InfoListItem>
                        <InfoListItemLeft>
                          <InfoListItemLabel>Product ID:</InfoListItemLabel>
                        </InfoListItemLeft>
                        <InfoListItemRight>
                          <InfoListItemText>{product._id}</InfoListItemText>
                        </InfoListItemRight>
                      </InfoListItem>
                      <InfoListItem>
                        <InfoListItemLeft>
                          <InfoListItemLabel>Category:</InfoListItemLabel>
                        </InfoListItemLeft>
                        <InfoListItemRight>
                          <InfoListItemText>
                            {product.category}
                          </InfoListItemText>
                        </InfoListItemRight>
                      </InfoListItem>
                      <InfoListItem>
                        <InfoListItemLeft>
                          <InfoListItemLabel>Manufacturer:</InfoListItemLabel>
                        </InfoListItemLeft>
                        <InfoListItemRight>
                          <InfoListItemText>
                            {product.manufacturer}
                          </InfoListItemText>
                        </InfoListItemRight>
                      </InfoListItem>
                      <InfoListItem>
                        <InfoListItemLeft>
                          <InfoListItemLabel>Contents:</InfoListItemLabel>
                        </InfoListItemLeft>
                        <InfoListItemRight>
                          <InfoListItemText>
                            {product.contents}
                          </InfoListItemText>
                        </InfoListItemRight>
                      </InfoListItem>
                    </InfoList>
                  </InfoLeft>
                  <InfoRight>
                    <InfoList>
                      <InfoListItem>
                        <InfoListItemLeft>
                          <InfoListItemLabel>SKU:</InfoListItemLabel>
                        </InfoListItemLeft>
                        <InfoListItemRight>
                          <InfoListItemText>{product.sku}</InfoListItemText>
                        </InfoListItemRight>
                      </InfoListItem>
                      <InfoListItem>
                        <InfoListItemLeft>
                          <InfoListItemLabel>MPN:</InfoListItemLabel>
                        </InfoListItemLeft>
                        <InfoListItemRight>
                          <InfoListItemText>{product.mpn}</InfoListItemText>
                        </InfoListItemRight>
                      </InfoListItem>
                      <InfoListItem>
                        <InfoListItemLeft>
                          <InfoListItemLabel>VAT:</InfoListItemLabel>
                        </InfoListItemLeft>
                        <InfoListItemRight>
                          <InfoListItemText>{product.vat}</InfoListItemText>
                        </InfoListItemRight>
                      </InfoListItem>
                    </InfoList>
                  </InfoRight>
                </InfoWrapper>
              </TopLeft>
              <TopRight>
                <ImageWrapper className="big">
                  {image && <Image src={image} alt={name} />}
                </ImageWrapper>
              </TopRight>
            </Top>

            <ContentWrapper>
              <Tabs
                defaultActiveKey="general"
                id="product-edit-tabs"
                className="mb-3"
              >
                <Tab eventKey="general" title="General Information">
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <Form id="product-edit" onSubmit={submitHandler}>
                      <TabContent>
                        <TabContentSplit>
                          <TabContentSplitLeft>
                            <InputWrapper as={Form.Group} controlId="name">
                              <Label as={Form.Label}>Name</Label>
                              <Input
                                as={Form.Control}
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              ></Input>
                            </InputWrapper>

                            <InputWrapper as={Form.Group} controlId="category">
                              <Label as={Form.Label}>Category</Label>
                              <Select
                                as={Form.Select}
                                value={category}
                                onChange={categorySelectChangeHandler}
                              >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name} -{" "}
                                    <span>{category._id}</span>
                                  </option>
                                ))}
                              </Select>
                            </InputWrapper>

                            <InputWrapper as={Form.Group} controlId="sku">
                              <Label as={Form.Label}>SKU</Label>
                              <Input
                                as={Form.Control}
                                type="text"
                                placeholder="Enter sku"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                              ></Input>
                            </InputWrapper>

                            <InputWrapper as={Form.Group} controlId="mpn">
                              <Label as={Form.Label}>MPN</Label>
                              <Input
                                as={Form.Control}
                                type="text"
                                placeholder="Enter mpn"
                                value={mpn}
                                onChange={(e) => setMpn(e.target.value)}
                              ></Input>
                            </InputWrapper>

                            <InputWrapper as={Form.Group} controlId="vat">
                              <Form.Label>
                                <Label as={Form.Label}>VAT Percentage</Label>
                              </Form.Label>
                              <Input
                                as={Form.Control}
                                type="text"
                                placeholder="Enter vat percentage"
                                value={vat}
                                onChange={(e) => setVat(e.target.value)}
                              ></Input>
                            </InputWrapper>

                            <InputWrapper
                              as={Form.Group}
                              controlId="manufacturer"
                            >
                              <Label as={Form.Label}>Manufacturer</Label>

                              <Input
                                as={Form.Control}
                                type="text"
                                placeholder="Enter manufacturer"
                                value={manufacturer}
                                onChange={(e) =>
                                  setManufacturer(e.target.value)
                                }
                              ></Input>
                            </InputWrapper>
                          </TabContentSplitLeft>
                          <TabContentSplitRight>
                            <InputWrapper as={Form.Group} controlId="image">
                              <Label as={Form.Label}>Image</Label>

                              <UploadImageWrapper>
                                <ImageWrapper>
                                  {image && <Image src={image} alt={name} />}
                                </ImageWrapper>
                                <UploadButtons>
                                  <Input
                                    className="image-input"
                                    as={Form.Control}
                                    type="text"
                                    placeholder="Enter image url"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                  ></Input>
                                  <Input
                                    className="upload-input"
                                    as={Form.Control}
                                    id=""
                                    type="file"
                                    onChange={uploadFileHandler}
                                  />

                                  {uploading && <Loader />}
                                </UploadButtons>
                              </UploadImageWrapper>
                            </InputWrapper>
                            <InputWrapper as={Form.Group} controlId="contents">
                              <Label as={Form.Label}>Package contents</Label>
                              <Input
                                as={Form.Control}
                                type="text"
                                placeholder="Enter package contents"
                                value={contents}
                                onChange={(e) => setContents(e.target.value)}
                              ></Input>
                            </InputWrapper>
                            <InputWrapper
                              as={Form.Group}
                              controlId="description"
                            >
                              <Form.Label>
                                <Label as={Form.Label}>Description</Label>
                              </Form.Label>
                              <Input
                                as={Form.Control}
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              ></Input>
                            </InputWrapper>
                            <InputWrapper
                              as={Form.Group}
                              controlId="longDescription"
                            >
                              <Label as={Form.Label}>Long description</Label>
                              <TextArea
                                as={Form.Input}
                                type="textarea"
                                rows="6"
                                placeholder="Enter long description"
                                value={longDescription}
                                onChange={(e) =>
                                  setLongDescription(e.target.value)
                                }
                              ></TextArea>
                            </InputWrapper>
                          </TabContentSplitRight>
                        </TabContentSplit>
                      </TabContent>
                      <ButtonsWrapper>
                        <DefaultButton type="submit" label="Update Product" />
                      </ButtonsWrapper>
                    </Form>
                  )}
                </Tab>
                <Tab eventKey="suppliers" title="Suppliers">
                  <ProductSuppliersTab
                    productId={productId}
                    currentSuppliers={currentSuppliers}
                    supplierId={supplierId}
                  />
                </Tab>
                <Tab eventKey="images" title="Images" disabled>
                  <div>images</div>
                </Tab>
              </Tabs>
              {/*       <UpdateProductSupplierPriceModal
          supplierId={supplierId}
          show={show}
          price={price}
          handleClose={closeModal}
          supplierId={supplierId}
          productId={product._id}
        /> */}
            </ContentWrapper>
          </InnerWrapper>
        </Main>
      </Wrapper>
    </>
  );
};

const InfoWrapper = styled.div`
  display: flex;
  border-top: 0px solid #f8f8f8;
  padding: 0rem 0 1rem;
`;
const InfoList = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoLeft = styled.div`
  display: flex;
`;
const InfoRight = styled.div`
  display: flex;
  padding-left: 2rem;
`;
const InfoListItem = styled.div`
  display: flex;
  align-items: center;
`;
const InfoListItemLeft = styled.div`
  display: flex;
`;
const InfoListItemRight = styled.div`
  display: flex;
`;
const InfoListItemLabel = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #727190;
  letter-spacing: 0px;
  margin: 0;
  padding: 3px 0;
`;
const InfoListItemText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #2a364e;
  letter-spacing: 0px;
  margin: 0 0 0 5px;
  padding: 3px 0;
`;

const TabContent = styled.div`
  width: 100%;
`;
const ButtonsWrapper = styled.div`
  display: flex;
`;

const TabContentSplit = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const TabContentSplitLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
`;
const TabContentSplitRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
`;
const InputWrapper = styled.div`
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  color: #727190;
`;
const Input = styled.input`
  font-size: 16px;
  font-weight: 500;
  color: #2a364e;
  background: #f8f8f8;
  border-radius: 200px;
  padding: 10px 1.5rem;
  &.image-input {
    display: none;
  }
  &.upload-input {
    display: flex;
  }
`;
const TextArea = styled.textarea`
  font-size: 16px;
  font-weight: 500;
  color: #2a364e;
  background: #f8f8f8;
  border-radius: 20px;
  border: none;
  padding: 1rem 1.5rem;
`;
const Select = styled.input`
  font-size: 16px;
  font-weight: 500;
  color: #2a364e;
  background: #f8f8f8;
  border-radius: 200px;
  padding: 1rem 1.5rem;
`;
const UploadImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const UploadButtons = styled.div`
  display: flex;
  margin: 1rem 0 0;
`;
const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0rem 0 0;
  border: 2px solid #f8f8f8;
  &.big {
    width: 160px;
    height: 160px;
  }
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
`;
const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background: #f8f8f8;
`;

const Main = styled.div`
  width: 100%;
  padding: 0rem 2rem 6rem;
  display: flex;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
`;

const TopLeft = styled.div`
  display: flex;

  flex-direction: column;
`;
const TopRight = styled.div`
  display: flex;
  align-items: center;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 3rem;
  padding-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 20px;
  letter-spacing: 0px;
  color: #2a364e;
  text-transform: none;
  font-weight: 600;
  padding: 0;
  margin: 0 0 10px;
  display: flex;
  flex-direction: column;
  span {
    margin: 8px 0 0;
    color: #727190;
    font-size: 14px;
    font-weight: 500;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2.5rem;
`;

const InnerHeader = styled.div`
  width: 100%;
  border-bottom: 0px solid #e6e8ec;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InnerHeaderLeft = styled.div`
  display: flex;
`;

const InnerHeaderRight = styled.div`
  display: flex;
`;

export default ProductEditScreen;
