app.controller('companiesCtrl', function ($scope, $modal, $filter, Data) {
    $scope.company = {};
    Data.get('companies').then(function(data){		
        $scope.companies = data.data;		
    });
    $scope.changeCompanyStatus = function(company){
        company.status = (company.status=="Active" ? "Inactive" : "Active");
        Data.put("companies/"+company.CompanyID,{status:company.status});
    };
    $scope.deleteCompany = function(company){
        if(confirm("Are you sure to remove the company")){
            Data.delete("companies/"+company.CompanyID).then(function(result){
                //$scope.companies = _.without($scope.companies, _.findWhere($scope.companies, {id:company.CompanyID}));				
				Data.get('companies').then(function(data){		
					$scope.companies = data.data;		
				});
            });			
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/companyEdit.html',
          controller: 'companyEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){				
                $scope.companies.push(selectedObject);
                $scope.companies = $filter('orderBy')($scope.companies, 'CompanyID', 'reverse');				
            }else if(selectedObject.save == "update"){				
                p.Name = selectedObject.Name;
				p.Address = selectedObject.Address;
                p.City = selectedObject.City;
                p.Country = selectedObject.Country;
                p.Email = selectedObject.Email;
				p.Phone = selectedObject.Phone;
				p.status = selectedObject.status;
				p.Directors = selectedObject.dist.toString();
            }
        });
    };
    
 $scope.columns = [
                    {text:"CompanyID",predicate:"CompanyID",sortable:true,dataType:"number"},
                    {text:"Name",predicate:"Name",sortable:true},                    
					{text:"Address",predicate:"Address",sortable:true},                  
					{text:"City",predicate:"City",sortable:true},                  
					{text:"Country",predicate:"Country",sortable:true},                  
                    {text:"Status",predicate:"status",sortable:true},
                    {text:"Action",predicate:"",sortable:false}
                ];

});

app.controller('companyEditCtrl', function ($scope, $modalInstance, item, Data) {

	$scope.company = angular.copy(item);
	
	$scope.company.dir_name  = '';					
	if(item.CompanyID > 0){
			if(angular.isDefined($scope.company.Directors)){
				if($scope.company.Directors != ''){
					$scope.company.dist = $scope.company.Directors.split(',');					
				}else{
					$scope.company.dist = [];
				}
			}else{
				$scope.company.dist = [];
			}
	}else{
		$scope.company.dist = [];
	}

	$scope.deleteItem = function (index) {
        $scope.company.dist.splice(index, 1);
    }
	
    $scope.addItem = function (index) {
		if($scope.company.dir_name){
			$scope.company.dist.push($scope.company.dir_name);
			$scope.company.dir_name = '';
		}
    }		

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
	$scope.title = (item.CompanyID > 0) ? 'Edit Company' : 'Add Company';
	$scope.buttonText = (item.CompanyID > 0) ? 'Update Company' : 'Add New Company';

	var original = item;
	$scope.isClean = function() {
		return angular.equals(original, $scope.company);
	}
	$scope.saveCompany = function (company) {
		//company.CompanyID = company.CompanyID;
		//company.CompanyID = 3;
		if(company.CompanyID > 0){
			Data.put('companies/'+company.CompanyID, company).then(function (result) {
				if(result.status != 'error'){
					var x = angular.copy(company);
					x.save = 'update';
					$modalInstance.close(x);
				}else{
					console.log(result);
				}
			});
		}else{
			company.status = 'Active';			
			Data.post('companies', company).then(function (result) {
				if(result.status != 'error'){
					var x = angular.copy(company);
					x.save = 'insert';
					x.CompanyID = result.data;
					x.Directors = $scope.company.dist.toString();
					$modalInstance.close(x);
				}else{
					console.log(result);
				}
			});
		}
	};
});
