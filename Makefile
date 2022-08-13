build-dashboard-windows: 
		cd blackhole-dashboard && yarn && yarn build  
		move ./blackhole-dashboard/dist ./dashboard-dist


build-dashboard-linux: 
		cd ./blackhole-dashboard && yarn && yarn build  
		mv ./blackhole-dashboard/dist ./dashboard-dist
