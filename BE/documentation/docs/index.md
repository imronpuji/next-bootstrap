# Welcome to Voting API Documentation

	Sebelum memulai untuk bla bla


## Authentication
### Register
	/auth/register/
		payload : {
			phone_number : 085XXXXXX
		} 
### Login
	/auth/login/
		payload : {
			phone_number : 085XXXXX
		} 

### Login Verifikasi Code
	/auth/login/verify/
		payload : {
			code : 09XX
		} 

<!-- crud role -->
## Roles
#### Create Role
	/role/
		payload : {
			role : 'admin'
		} 
#### Delete Role
	/role/:id/

#### Edit Role
	/role/:id/
		payload : {
			role : 'adminXXX'
		} 
#### Retrieve Role
	/role/

<!-- crud category -->
## Category
#### Create category
	/category/
		payload : {
			category : 'Makanan'
		} 
#### Delete category
	/category/:id/
#### Edit category
	/category/:id/
		payload : {
			category : 'makananXXX'
		} 
#### Retrieve category
	/category/

<!-- Warga Post -->

## Post
#### warga create post
	/user/post/
		payload : {
			tags : [{user_id:1}, {user_id:2}],
			title : "String bla bla",
			content : "bla bla",
			post_type_id : 1,
			category:[{category_id:1}]
		} 
- Category is optional  
- Tags is user have the goverment role 

#### warga delete post
	/user/:id/post/

#### warga edit post 
	/user/:id/post/ 
		payload : {
			tags : [{user_id:1}, {user_id:2}],
			title : "String bla bla",
			content : "bla bla",
			post_type_id : 1,
			category:[{category_id:1}]
		} 
- Category is optional  
- Tags is user have the goverment role 

#### warga retrieve post
	/user/post/

#### admin delete post
	/admin/:id/post/

#### How to verify Post ?
	/post/:id/verify
- post can only verified by admin, verifikator, moderator

#### How to hide Post ?
	/post/:id/hide
- post can only hide by admin, verifikator, moderator



<!-- Post Type -->

## Post Type
#### Create post type
	/post/type/
		payload : {
			post_type : 'keluh kesah'
		} 
#### Delete post type
	/post/:id/type/

#### Edit post type
	/post/:id/type/
		payload : {
			post_type:'kesah keluh'
		} 
#### Retrieve post type
	/post/types/

<!-- Vote -->

## Vote
#### How to vote ?
	/vote/:id/
		payload : {
			vote : true
		} 
- id is post id
- vote is boolean, if true mean's agree and the opposite

#### How to unvote ?
	/unvote/:id/
- id is vote id

## Comment Post
#### How to comment ?
	/post/:id/comment/
		payload : {
			comment : 'test 123'
		} 
- id is post id
- comment is string

#### How to delete Comment ?
	/post/:id/comment
- id is comment id

#### How to edit Comment ?
	/post/:id/comment payload:{comment:"string"}
- id is comment id
- comment is 

## supporting document
#### How to user upload document ?
	/user/document/
		payload : {
			self_id_card: file,
	    	photo_id_card: file,
	    	organization_card: file
		} 


#### How to user delete document ?
	/document

#### How to user edit document ?
	/user/document/
		payload : {
			self_id_card: file,
	    	photo_id_card: file,
	    	organization_card: file
		} 


<!-- setting profile company -->
## Setting Profile Application
#### Create App
	/setting/
		payload : {
			title : 'Ruas Digital'
			description : 'ruas digital adalah bla bla....'
			favicon : 'fav.ico'
		} 
#### Delete App
	/setting/:id/

#### Edit App
	/setting/:id/
		payload : {
			title : 'Ruas Digital'
			description : 'ruas digital adalah bla bla....'
			favicon : 'fav.ico'
		} 
#### Retrieve App
	/setting/
