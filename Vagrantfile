# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    required_plugins = %w(vagrant-vbguest vagrant-hostmanager)

    plugins_to_install = required_plugins.select { |plugin| not Vagrant.has_plugin? plugin }
    if not plugins_to_install.empty?
        puts "Installing plugins: #{plugins_to_install.join(' ')}"
        if system "vagrant plugin install #{plugins_to_install.join(' ')}"
            exec "vagrant #{ARGV.join(' ')}"
        else
            abort "Installation of one or more plugins has failed. Aborting."
        end
    end

    # Configuration for jenkins vm
    config.vm.define "aws-lambda-workshop", primary: true do |serverless|
        serverless.vm.box = "ubuntu/xenial64"
        serverless.vm.box_check_update = true
        serverless.vm.network "private_network", ip: "192.168.69.69"
        serverless.vm.provider "virtualbox" do |vb|
            vb.cpus = 2
            vb.memory = 4096
        end

        serverless.vm.hostname = "aws-lambda-workshop"

        serverless.vm.synced_folder ".", "/vagrant", disabled: true
        serverless.vm.synced_folder ".", "/var/aws-lambda-workshop", create: true

        # serverless.vm.provision "docker"

        serverless.vm.provision "shell", name: "Install serverless", path: "provisioners/install-serverless.sh"

    end
end
