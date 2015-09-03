## Company management using AngularJS, MySQL and PHP RESTful API
This is company management application build with AngularJS, MySql and RESTful API.
###How to use
- Download project files and move on server
- Creates Database and import required schema (companies.sql).
- Database configuration: api/v1/config.php

Note: In this project I ignored the security part of the web application.

###Modules used
- PHP Slim (to create our data provider / RESTful API)
- AngularJS Bootstrap UI modal  (JavaScript client)

###Requirement Specification
- Add/Edit/Delete new company to inventory
- Activate/De-activate
- Filter list of companies at client side

###RESTful API Details:
<ul>
	<li><b>Get Company List</b>
		<dl>
		  <dt>Call from controller</dt>
		  <dd>Data.get('companies').then(function(data){ // Success message with list of Companies });</dd>

		  <dt>cURL</dt>
		  <dd>$http.post(serviceBase + q, object).then(function (results) {	return results.data; });</dd>
		</dl>
	</li>
	<li><b>Add Company</b>
		<dl>
		  <dt>Call from controller</dt>
		  <dd>Data.post('companies', company).then(function (result) { // Success message with CompanyID });</dd>

		  <dt>cURL</dt>
		  <dd>$http.post(serviceBase + q, object).then(function (results) {	return results.data; });</dd>
		</dl>
	</li>
	<li><b>Update Company</b>
		<dl>
		  <dt>Call from controller</dt>
		  <dd>Data.put('companies/'+company.CompanyID, company).then(function (result) { // Success message });</dd>

		  <dt>cURL</dt>
		  <dd>$http.put(serviceBase + q, object).then(function (results) {	return results.data; });</dd>
		</dl>
	</li>
	<li><b>Delete Company</b>
		<dl>
		  <dt>Call from controller</dt>
		  <dd>Data.delete("companies/"+company.CompanyID).then(function(result){ // Success message });</dd>

		  <dt>cURL</dt>
		  <dd>$http.delete(serviceBase + q).then(function (results) {	return results.data; });</dd>
		</dl>
	</li>
</ul>

